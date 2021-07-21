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
import ItemMakanan from './ItemMakanan';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {selectKeranjang} from '../../../features/keranjangSlice';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const MakananPage = ({navigation}) => {
  const [list, setList] = React.useState([]);
  const [listAsia, setListAsia] = React.useState([]);
  const [idItemAsia, setIdItemAsia] = React.useState([]);
  const [listChinese, setListChinese] = React.useState([]);
  const [idItemChinese, setIdItemChinese] = React.useState([]);
  const [listSea, setListSea] = React.useState([]);
  const [idItemSea, setIdItemSea] = React.useState([]);
  const [listMieSnack, setListMieSnack] = React.useState([]);
  const [idItemMieSnack, setIdItemMieSnack] = React.useState([]);
  const [listSundanese, setListSudanese] = React.useState([]);
  const [idItemSundanese, setIdItemSundanese] = React.useState([]);
  const [listKorean, setListKorean] = React.useState([]);
  const [idItemKorean, setIdItemKorean] = React.useState([]);
  const [idItem, setIdItem] = React.useState([]);
  const [totalHarga, setTotalHarga] = React.useState(0);
  const [statusPesan, setStatusPesan] = React.useState('');
  const keranjang = useSelector(selectKeranjang);
  const [once, setOnce] = React.useState(0);

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
        if (item.tipe === 'makanan') {
          harga = harga + item.harga * item.qty;
        }
      });
    }
    setTotalHarga(harga);
  };

  const getFood = region => {
    let listGet = [];
    let listId = [];
    firestore()
      .collection('menu')
      .where('jenis', '==', 'makanan')
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
    console.log('get all region food');
    let asianFood = getFood('asia');
    let chineseFood = getFood('chinese');
    let seaFood = getFood('sea');
    let mieSnack = getFood('miesnack');
    let sundaneseFood = getFood('sunda');
    let koreaFood = getFood('korea');

    setListAsia(asianFood[0]);
    setIdItemAsia(asianFood[1]);

    setListChinese(chineseFood[0]);
    setIdItemChinese(chineseFood[1]);

    setListSea(seaFood[0]);
    setIdItemSea(seaFood[1]);

    setListMieSnack(mieSnack[0]);
    setIdItemMieSnack(mieSnack[1]);

    setListSudanese(sundaneseFood[0]);
    setIdItemSundanese(sundaneseFood[1]);

    setListKorean(koreaFood[0]);
    setIdItemKorean(koreaFood[1]);
  };

  const getFireData = () => {
    let listGet = [];
    let listId = [];
    firestore()
      .collection('menu')
      .where('jenis', '==', 'makanan')
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
        console.log('makan');
        if (querySnapshot.size === 0) {
          setStatusPesan('belum');
        } else {
          setStatusPesan('sudah');
        }
        console.log(statusPesan);
      });
  };

  React.useEffect(() => {
    console.log(once);
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
    axios.get('http://0.0.0.0:3000/MenuMakanan').then(res => {
      setList(res.data);
    });
  };
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View style={styles.header}>
        <Image style={styles.headerImage} source={header} />
        <Image style={styles.headerlogo} source={logo} />
      </View>
      <Text style={styles.title}>Daftar Makanan</Text>
      <ScrollView vertical>
        {listAsia.map((item, i) => {
          return (
            <ItemMakanan
              key={idItemAsia[i]}
              idItemDiDB={idItemAsia[i]}
              namaItem={item.nama}
              jumlahItem={item.stok}
              hargaItem={item.harga}
              linkGambar={item.linkGambar}
              statusPes={statusPesan}
            />
          );
        })}
        <Text style={styles.foodType}>Chinese Food</Text>
        {listChinese.map((item, i) => {
          return (
            <ItemMakanan
              key={idItemChinese[i]}
              idItemDiDB={idItemChinese[i]}
              namaItem={item.nama}
              jumlahItem={item.stok}
              hargaItem={item.harga}
              linkGambar={item.linkGambar}
              statusPes={statusPesan}
            />
          );
        })}
        <Text style={styles.foodType}>SeaFood</Text>
        {listSea.map((item, i) => {
          return (
            <ItemMakanan
              key={idItemSea[i]}
              idItemDiDB={idItemSea[i]}
              namaItem={item.nama}
              jumlahItem={item.stok}
              hargaItem={item.harga}
              linkGambar={item.linkGambar}
              statusPes={statusPesan}
            />
          );
        })}
        <Text style={styles.foodType}>Mie & Snack</Text>
        {listMieSnack.map((item, i) => {
          return (
            <ItemMakanan
              key={idItemMieSnack[i]}
              idItemDiDB={idItemMieSnack[i]}
              namaItem={item.nama}
              jumlahItem={item.stok}
              hargaItem={item.harga}
              linkGambar={item.linkGambar}
              statusPes={statusPesan}
            />
          );
        })}
        <Text style={styles.foodType}>Sundanese Food</Text>
        {listSundanese.map((item, i) => {
          return (
            <ItemMakanan
              key={idItemSundanese[i]}
              idItemDiDB={idItemSundanese[i]}
              namaItem={item.nama}
              jumlahItem={item.stok}
              hargaItem={item.harga}
              linkGambar={item.linkGambar}
              statusPes={statusPesan}
            />
          );
        })}
        <Text style={styles.foodType}>Korean Food</Text>
        {listKorean.map((item, i) => {
          return (
            <ItemMakanan
              key={idItemKorean[i]}
              idItemDiDB={idItemKorean[i]}
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
        <TouchableOpacity style={styles.Btn}>
          <Text
            style={styles.btnText}
            onPress={() => {
              navigation.navigate('KeranjangPelanggan', {
                statusPesan: statusPesan,
              });
            }}>
            Cek Keranjang
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MakananPage;

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
