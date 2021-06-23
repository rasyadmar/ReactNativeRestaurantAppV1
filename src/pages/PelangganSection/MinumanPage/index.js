import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import {useEffect, useState} from 'react/cjs/react.development';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import header from '../../../assets/image/headerflip.jpeg';
import logo from '../../../assets/image/img_logo.jpeg';
import ItemMinuman from './ItemMinuman';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {selectKeranjang} from '../../../features/keranjangSlice';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const MinumanPage = ({navigation}) => {
  const [list, setList] = useState([]);
  const [idItem, setIdItem] = useState([]);
  const [listCoffee, setListCoffee] = useState([]);
  const [idItemCoffee, setIdItemCoffee] = useState([]);
  const [listJus, setListJus] = useState([]);
  const [idItemJus, setIdItemJus] = useState([]);
  const [listTeh, setListTeh] = useState([]);
  const [idItemTeh, setIdItemTeh] = useState([]);
  const [listMilk, setListMilk] = useState([]);
  const [idItemMilk, setIdItemMilk] = useState([]);
  const [totalHarga, setTotalHarga] = useState(0);
  const [statusPesan, setStatusPesan] = useState('');
  const keranjang = useSelector(selectKeranjang);
  const [once, setOnce] = useState(0);

  const handleMassage = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('Status Pesanan Anda Telah DiPerbarui!');
    });

    return unsubscribe;
  };

  const cekHarga = items => {
    let harga = 0;
    if (items.length) {
      items.map(item => {
        if (item.tipe === 'minuman') {
          harga = harga + item.harga * item.qty;
        }
      });
    }
    setTotalHarga(harga);
  };

  const getFireData = () => {
    let listGet = [];
    let listId = [];
    firestore()
      .collection('menu')
      .where('jenis', '==', 'minuman')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          listGet.push(documentSnapshot.data());
          listId.push(documentSnapshot.id);
        });
        setList(listGet);
        setIdItem(listId);
      });
  };

  const getStatus = (nama, nomeja) => {
    console.log('Getting Status');
    firestore()
      .collection('pesanan')
      .where('meja', '==', nomeja)
      .where('pemesan', '==', nama)
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot.size);
        console.log('minum');
        if (querySnapshot.size === 0) {
          setStatusPesan('belum');
        } else {
          setStatusPesan('sudah');
        }
        console.log(statusPesan);
      });
  };

  const getDrink = region => {
    let listGet = [];
    let listId = [];
    firestore()
      .collection('menu')
      .where('jenis', '==', 'minuman')
      .where('region', '==', region)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          listGet.push(documentSnapshot.data());
          listId.push(documentSnapshot.id);
        });
        // setListAsia(listGet);
        // setIdItemAsia(listId);
      });
    return [listGet, listId];
  };

  const getAllRegion = () => {
    console.log('get all region Drink');
    let coffee = getDrink('coffee');
    let jus = getDrink('jus');
    let teh = getDrink('teh');
    let milk = getDrink('milk');

    setListCoffee(coffee[0]);
    setIdItemCoffee(coffee[1]);

    setListJus(jus[0]);
    setIdItemJus(jus[1]);

    setListTeh(teh[0]);
    setIdItemTeh(teh[1]);

    setListMilk(milk[0]);
    setIdItemMilk(milk[1]);
  };

  useEffect(() => {
    if (once === 0) {
      const bootstrapAsync = async () => {
        let nama;
        let nomeja;
        try {
          nama = await AsyncStorage.getItem('namaPemesan');
          nomeja = await AsyncStorage.getItem('nomorMeja');
        } catch (e) {}
        getStatus(nama, nomeja);
      };
      getAllRegion();
      cekHarga(keranjang);
      bootstrapAsync();
      setOnce(1);
    }
    cekHarga(keranjang);
    handleMassage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keranjang]);

  const currencyFormat = num => {
    return 'Rp' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const getData = () => {
    axios.get('http://0.0.0.0:3000/Menuminuman').then(res => {
      setList(res.data);
    });
  };
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View style={styles.header}>
        <Image style={styles.headerImage} source={header} />
        <Image style={styles.headerlogo} source={logo} />
      </View>
      <Text style={styles.title}>Daftar minuman</Text>
      <ScrollView vertical>
        <Text style={styles.foodType}>Coffee</Text>
        {listCoffee.map((item, i) => {
          return (
            <ItemMinuman
              key={idItemCoffee[i]}
              idItemDiDB={idItemCoffee[i]}
              namaItem={item.nama}
              jumlahItem={item.stok}
              hargaItem={item.harga}
              linkGambar={item.linkGambar}
              statusPes={statusPesan}
            />
          );
        })}
        <Text style={styles.foodType}>Jus</Text>
        {listJus.map((item, i) => {
          return (
            <ItemMinuman
              key={idItemJus[i]}
              idItemDiDB={idItemJus[i]}
              namaItem={item.nama}
              jumlahItem={item.stok}
              hargaItem={item.harga}
              linkGambar={item.linkGambar}
              statusPes={statusPesan}
            />
          );
        })}
        <Text style={styles.foodType}>Teh</Text>
        {listTeh.map((item, i) => {
          return (
            <ItemMinuman
              key={idItemTeh[i]}
              idItemDiDB={idItemTeh[i]}
              namaItem={item.nama}
              jumlahItem={item.stok}
              hargaItem={item.harga}
              linkGambar={item.linkGambar}
              statusPes={statusPesan}
            />
          );
        })}
        <Text style={styles.foodType}>Milk</Text>
        {listMilk.map((item, i) => {
          return (
            <ItemMinuman
              key={idItemMilk[i]}
              idItemDiDB={idItemMilk[i]}
              namaItem={item.nama}
              jumlahItem={item.stok}
              hargaItem={item.harga}
              linkGambar={item.linkGambar}
              statusPes={statusPesan}
            />
          );
        })}
      </ScrollView>
      <View style={styles.footer}>
        <Text>
          <Text style={{color: '#7f8c8d', fontSize: hp('1.5%')}}>Total: </Text>
          <Text
            style={{
              fontWeight: 'bold',
              color: '#f39c12',
              fontSize: hp('2.5%'),
            }}>
            {currencyFormat(totalHarga)}
          </Text>
        </Text>
        {statusPesan === 'belum' && (
          <TouchableOpacity style={styles.Btn}>
            <Text
              style={styles.btnText}
              onPress={() => {
                navigation.navigate('KeranjangPelanggan');
              }}>
              Cek Keranjang
            </Text>
          </TouchableOpacity>
        )}
        {statusPesan === 'sudah' && (
          <Text style={{color: '#7f8c8d', fontSize: hp('1.5%')}}>
            Sudah Memesan
          </Text>
        )}
      </View>
    </View>
  );
};

export default MinumanPage;

const styles = StyleSheet.create({
  itemData: {marginStart: wp('5%'), flex: 1},
  itemImage: {height: hp('10%'), width: wp('20%')},
  itemJumlah: {
    color: '#bdc3c7',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  itemName: {
    fontSize: hp('2.5%'),
    height: hp('5%'),
    color: '#7f8c8d',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerImage: {
    height: 100,
    width: 215,
  },
  headerlogo: {
    height: 100,
    width: 150,
  },
  title: {
    // backgroundColor: '#f39c12',
    textAlign: 'center',
    fontSize: hp('3.5%'),
    color: '#f39c12',
    fontWeight: 'bold',
    marginVertical: hp('1%'),
  },
  footer: {
    flexDirection: 'row',
    padding: wp('3%'),
    justifyContent: 'space-between',
  },
  Btn: {
    width: wp('27%'),
    backgroundColor: '#f39c12',
    borderRadius: hp('4%'),
    height: hp('4.5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
  },
  foodType: {
    margin: hp('1%'),
    padding: hp('1%'),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(127, 140, 141,0.1)',
    fontSize: hp('2.5%'),
    color: '#7f8c8d',
  },
});
