import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const itemMenuTerjual = ({minggu, terjual, moveToDetailMinggu}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={moveToDetailMinggu}>
      <Text style={styles.text}>{minggu}</Text>
      <Text style={styles.text}>{terjual} Barang</Text>
    </TouchableOpacity>
  );
};

export default itemMenuTerjual;

const styles = StyleSheet.create({
  container: {
    marginVertical: hp('1%'),
    marginHorizontal: hp('3%'),
    padding: hp('3%'),
    backgroundColor: 'orange',
    borderRadius: hp('1%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: hp('2%'),
    color: '#fff',
  },
});
