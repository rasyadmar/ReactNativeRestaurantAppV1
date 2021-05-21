import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
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

const MinumanPage = () => {
  const [list, setList] = useState([]);
  const [totalHarga, setTotalHarga] = useState(0);
  const keranjang = useSelector(selectKeranjang);

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

  useEffect(() => {
    getData();
    cekHarga(keranjang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currencyFormat = num => {
    return 'Rp' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const getData = () => {
    axios.get('http://0.0.0.0:3000/MenuMinuman').then(res => {
      setList(res.data);
    });
  };
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View style={styles.header}>
        <Image style={styles.headerImage} source={header} />
        <Image style={styles.headerlogo} source={logo} />
      </View>
      <Text style={styles.title}>Daftar Minuman</Text>
      <ScrollView vertical>
        {list.map((item, i) => {
          return (
            <ItemMinuman
              key={item.id}
              idItemDiDB={item.id}
              namaItem={item.item}
              jumlahItem={item.jumlah}
              hargaItem={item.harga}
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
              cekHarga(keranjang);
            }}>
            Cek Harga
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MinumanPage;

const styles = StyleSheet.create({
  itemContainer: {margin: 10, flexDirection: 'row'},
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
    width: wp('25%'),
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
});
