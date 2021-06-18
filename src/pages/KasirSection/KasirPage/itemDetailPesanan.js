import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useEffect, useState} from 'react/cjs/react.development';
import storage from '@react-native-firebase/storage';

const ItemDetail = ({namaItem, jumlahItem, hargaItem, linkGambar}) => {
  const [urlGambar, setUrlGambar] = useState('');
  const currencyFormat = num => {
    return 'Rp' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };
  useEffect(() => {
    const bootstrapAsync = async () => {
      const url = await storage().ref(linkGambar).getDownloadURL();
      // console.log(linkGambar);
      console.log('ini', url);
      setUrlGambar(url);
    };
    bootstrapAsync();
  });
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
          Harga: {currencyFormat(hargaItem)}
        </Text>
      </View>
      <View>
        <Text style={{color: '#7f8c8d', fontSize: hp('1.5%')}}>Total: </Text>
        <Text
          style={{
            fontWeight: 'bold',
            color: '#f39c12',
            fontSize: hp('2.5%'),
          }}>
          {currencyFormat(hargaItem)}
        </Text>
      </View>
    </View>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  itemContainer: {margin: 10, flexDirection: 'row'},
  itemData: {marginStart: wp('5%'), flex: 1},
  itemImage: {height: hp('10%'), width: wp('20%')},
  itemJumlah: {
    color: '#bdc3c7',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    fontSize: hp('1.5%'),
  },
  itemName: {
    fontSize: hp('1.5%'),
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
