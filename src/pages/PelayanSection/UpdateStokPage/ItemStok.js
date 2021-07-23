/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useEffect, useState} from 'react/cjs/react.development';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  addToKeranjang,
  deleteFromKeranjang,
  increaseItemQty,
  decreaseItemQty,
} from '../../../features/keranjangSlice';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

export default function ItemBelanja({
  idItemDiDB,
  namaItem,
  jumlahItem,
  linkGambar,
}) {
  const [qty, setQty] = React.useState(0);
  const [urlGambar, setUrlGambar] = React.useState(0);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      const url = await storage().ref(linkGambar).getDownloadURL();
      setUrlGambar(url);
    };
    bootstrapAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = () => {
    if (qty !== 0) {
      firestore()
        .collection('menu')
        .doc(idItemDiDB)
        .update({
          stok: qty,
        })
        .then(() => {
          console.log('stok is updated!');
        });
    }
  };

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
        <Text style={styles.itemJumlah}>Stok: {jumlahItem}</Text>
      </View>
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        <View>
          <TextInput
            style={styles.inputText}
            placeholder="Stok Baru..."
            placeholderTextColor="#7f8c8d"
            keyboardType="numeric"
            onChangeText={text => setQty(text)}
          />
          <TouchableOpacity style={styles.BtnPlusMin}>
            <Text
              style={styles.btnText}
              onPress={() => {
                submit();
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
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
  inputText: {
    height: hp('7%'),
    color: '#7f8c8d',
  },
  itemName: {
    fontSize: hp('2%'),
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
    width: wp('18%'),
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
