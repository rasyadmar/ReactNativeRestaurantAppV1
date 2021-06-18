import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ItemPesanan = ({namaPelanggan, nomorMeja, status, detailFunction}) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={detailFunction}>
      <View>
        <View style={styles.itemElement}>
          <Text style={styles.itemName}>Pemesan: {namaPelanggan}</Text>
          <TouchableOpacity style={styles.BtnClose}>
            <Text style={styles.btnText}>x</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.itemElement}>
        <Text style={styles.itemName}>Nomor Meja: {nomorMeja}</Text>
        <View style={styles.BtnStatus}>
          <Text style={styles.btnText}>{status} Diproses</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemPesanan;

const styles = StyleSheet.create({
  itemContainer: {
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(127, 140, 141,0.1)',
    justifyContent: 'space-between',
  },
  itemElement: {flexDirection: 'row', justifyContent: 'space-between'},
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
  BtnClose: {
    width: hp('3.5%'),
    paddingBottom: hp('0.2%'),
    marginBottom: hp('0.5%'),
    marginHorizontal: wp('1%'),
    backgroundColor: 'red',
    borderRadius: hp('4%'),
    height: hp('3.5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  BtnStatus: {
    width: wp('30%'),
    marginBottom: hp('0.5%'),
    marginHorizontal: wp('1%'),
    backgroundColor: 'gray',
    borderRadius: hp('4%'),
    height: hp('3.5%'),
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
