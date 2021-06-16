/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useEffect, useState} from 'react/cjs/react.development';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import {
  deleteFromKeranjang,
  increaseItemQty,
  decreaseItemQty,
} from '../../../features/keranjangSlice';
import {useSelector} from 'react-redux';
import storage from '@react-native-firebase/storage';

import {selectKeranjang} from '../../../features/keranjangSlice';

export default function ItemBelanja({
  namaItem,
  jumlahItem,
  hargaItem,
  linkGambar,
}) {
  const dispatch = useDispatch();
  const keranjang = useSelector(selectKeranjang);
  const [qty, setQty] = useState(0);
  const [urlGambar, setUrlGambar] = useState('');
  const currencyFormat = num => {
    return 'Rp' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const checkKeranjang = () => {
    if (keranjang.length) {
      keranjang.map(item => {
        if (item.nama === namaItem) {
          setQty(item.qty);
        }
      });
    }
  };
  useEffect(() => {
    // checkKeranjang();
    const bootstrapAsync = async () => {
      const url = await storage().ref(linkGambar).getDownloadURL();
      console.log(linkGambar);
      setUrlGambar(url);
    };
    bootstrapAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.itemContainer}>
      <Image
        source={{
          // uri: `https://icotar.com/avatar/${namaItem}.png`,
          uri: urlGambar,
        }}
        style={styles.itemImage}
      />
      <View style={styles.itemData}>
        <Text style={styles.itemName}>{namaItem}</Text>
        <Text style={styles.itemJumlah}>Jumlah: {jumlahItem}</Text>
        <Text style={styles.itemJumlah}>
          Total Harga: {currencyFormat(hargaItem)}
        </Text>
      </View>
    </View>
  );
}

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
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
  },
  BtnPlusMin: {
    width: wp('9%'),
    marginHorizontal: wp('1%'),
    backgroundColor: '#f39c12',
    borderRadius: hp('4%'),
    height: hp('4.5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  QtyText: {
    backgroundColor: '#ecf0f1',
    padding: hp('1%'),
    fontSize: hp('1.5%'),
    borderRadius: hp('1%'),
  },
});
