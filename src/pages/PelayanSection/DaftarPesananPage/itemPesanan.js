import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';

const ItemPesanan = ({
  idItem,
  namaPelanggan,
  nomorMeja,
  status,
  detailFunction,
}) => {
  const deleteFireData = () => {
    firestore()
      .collection('pesanan')
      .doc(idItem)
      .delete()
      .then(() => {
        console.log('Delete Item Success');
      });
  };
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={detailFunction}>
      <View>
        <View style={styles.itemElement}>
          <Text style={styles.itemName}>Pemesan: {namaPelanggan}</Text>
          <TouchableOpacity
            style={styles.BtnClose}
            onPress={() => {
              deleteFireData();
            }}>
            <Text style={styles.btnText}>x</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.itemElement}>
        <Text style={styles.itemName}>Nomor Meja: {nomorMeja}</Text>
        {status === 'Belum Di Proses' && (
          <>
            <View style={styles.BtnStatus}>
              <Text style={styles.btnText}>{status}</Text>
            </View>
          </>
        )}
        {status === 'Sedang Di Proses' && (
          <>
            <View style={styles.BtnStatusOrange}>
              <Text style={styles.btnText}>{status}</Text>
            </View>
          </>
        )}
        {status === 'Sedang Di Antar' && (
          <>
            <View style={styles.BtnStatusGreen}>
              <Text style={styles.btnText}>{status}</Text>
            </View>
          </>
        )}
        {status === 'Sampai' && (
          <>
            <View style={styles.BtnStatusGreen}>
              <Text style={styles.btnText}>{status}</Text>
            </View>
          </>
        )}
        {status === 'Bayar' && (
          <>
            <View style={styles.BtnStatusGreen}>
              <Text style={styles.btnText}>{status}</Text>
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ItemPesanan;

const styles = StyleSheet.create({
  itemContainer: {
    margin: 10,
    // margin: hp('1%'),
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
    marginBottom: hp('0.5%'),
    marginHorizontal: wp('1%'),
    paddingHorizontal: hp('1%'),
    paddingVertical: hp('0.4%'),
    backgroundColor: 'gray',
    borderRadius: hp('4%'),
    height: hp('3.5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  BtnStatusOrange: {
    marginBottom: hp('0.5%'),
    marginHorizontal: wp('1%'),
    paddingHorizontal: hp('1%'),
    paddingVertical: hp('0.4%'),
    backgroundColor: '#f39c12',
    borderRadius: hp('4%'),
    height: hp('3.5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  BtnStatusGreen: {
    marginBottom: hp('0.5%'),
    marginHorizontal: wp('1%'),
    paddingHorizontal: hp('1%'),
    paddingVertical: hp('0.4%'),
    backgroundColor: 'green',
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
