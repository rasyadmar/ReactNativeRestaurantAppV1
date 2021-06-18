import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useEffect, useState} from 'react/cjs/react.development';
import axios from 'axios';
import header from '../../../assets/image/headerflip.jpeg';
import logo from '../../../assets/image/img_logo.jpeg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ItemStok from './ItemStok';

const UpdatestokPage = () => {
  const [list, setList] = useState([
    {
      id: '1',
      item: 'Ayam Goreng',
      jumlah: 2,
      harga: 1000,
      jenis: 'makanan',
    },
    {
      id: '2',
      item: 'Ayam Panggang',
      jumlah: 3,
      harga: 2000,
      jenis: 'makanan',
    },
    {
      id: '3',
      item: 'Ayam Opor',
      jumlah: 2,
      harga: 3000,
      jenis: 'makanan',
    },
    {
      id: '4',
      item: 'Bebek Goreng',
      jumlah: 3,
      harga: 1200,
      jenis: 'makanan',
    },
    {
      id: '5',
      item: 'Bebek Panggang',
      jumlah: 2,
      harga: 1320,
      jenis: 'makanan',
    },
    {
      id: '6',
      item: 'Ikan Goreng',
      jumlah: 3,
      harga: 1000,
      jenis: 'makanan',
    },
    {
      id: '7',
      item: 'Ikan Bakar',
      jumlah: 2,
      harga: 1000,
      jenis: 'makanan',
    },
    {id: '8', item: 'Sup Ikan', jumlah: 3, harga: 1000, jenis: 'makanan'},
    {
      id: '1',
      item: 'Teh',
      jumlah: 2,
      harga: 1000,
      jenis: 'minuman',
    },
    {
      id: '2',
      item: 'Jeruk',
      jumlah: 3,
      harga: 2000,
      jenis: 'minuman',
    },
    {
      id: '3',
      item: 'Kopi',
      jumlah: 2,
      harga: 3000,
      jenis: 'minuman',
    },
    {
      id: '4',
      item: 'Air Putih',
      jumlah: 3,
      harga: 1200,
      jenis: 'minuman',
    },
    {
      id: '5',
      item: 'Jus Jambu',
      jumlah: 2,
      harga: 1320,
      jenis: 'minuman',
    },
    {
      id: '6',
      item: 'Jus Mangga',
      jumlah: 3,
      harga: 1000,
      jenis: 'minuman',
    },
    {
      id: '7',
      item: 'Jus Duren',
      jumlah: 2,
      harga: 1000,
      jenis: 'minuman',
    },
    {id: '8', item: 'Jus Alpukat', jumlah: 3, harga: 1000, jenis: 'minuman'},
  ]);
  useEffect(() => {
    // getMenu();
    // getMinuman();
    // combine();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getMenu = () => {
    axios.get('http://0.0.0.0:3000/MenuSemua').then(res => {
      setList(res.data);
    });
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View style={styles.header}>
        <Image style={styles.headerImage} source={header} />
        <Image style={styles.headerlogo} source={logo} />
      </View>
      <Text style={styles.title}>Update Stok</Text>
      <ScrollView vertical>
        {list.map((item, i) => {
          return (
            <ItemStok
              key={item.id}
              idItemDiDB={item.id}
              namaItem={item.item}
              jumlahItem={item.jumlah}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default UpdatestokPage;

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
