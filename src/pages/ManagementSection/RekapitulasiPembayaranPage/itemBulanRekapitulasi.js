import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useEffect, useState} from 'react/cjs/react.development';

const ItemBulanRekapitulasi = ({bulan, tahun, toDetailRekapitulasi}) => {
  const [text, setText] = React.useState('');
  const formatingText = (bulanIn, tahunIn) => {
    let listBulan = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];
    setText(listBulan[bulanIn] + ' ' + tahunIn);
  };
  React.useEffect(() => {
    formatingText(bulan, tahun);
  });
  return (
    <TouchableOpacity style={styles.container} onPress={toDetailRekapitulasi}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ItemBulanRekapitulasi;

const styles = StyleSheet.create({
  container: {
    marginVertical: hp('1%'),
    marginHorizontal: hp('3%'),
    padding: hp('2%'),
    backgroundColor: '#f39c12',
    borderRadius: hp('1%'),
  },
  text: {
    fontSize: hp('2%'),
    color: '#fff',
  },
});
