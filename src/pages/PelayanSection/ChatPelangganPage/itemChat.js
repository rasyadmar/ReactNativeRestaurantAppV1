import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ItemChat = ({
  idItem,
  namaPelanggan,
  nomorMeja,
  unReadMessage,
  detailFunction,
}) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={detailFunction}>
      <View style={styles.itemElement}>
        <Text style={styles.itemName}>Pemesan: {namaPelanggan}</Text>
        {unReadMessage !== 0 && (
          <TouchableOpacity style={styles.BtnUnread}>
            <Text style={styles.btnText}>{unReadMessage}</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.itemName}>Nomor Meja: {nomorMeja}</Text>
    </TouchableOpacity>
  );
};

export default ItemChat;

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
  BtnUnread: {
    paddingVertical: hp('0.5%'),
    paddingHorizontal: hp('1%'),
    marginBottom: hp('0.5%'),
    marginHorizontal: wp('1%'),
    backgroundColor: '#f39c12',
    borderRadius: hp('4%'),
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
