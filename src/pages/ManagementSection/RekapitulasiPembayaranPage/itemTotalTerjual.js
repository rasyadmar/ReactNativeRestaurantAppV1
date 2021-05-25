import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const itemMenuTerjual = ({minggu, totalHarga}) => {
  const currencyFormat = num => {
    return 'Rp' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{minggu}</Text>
      <Text style={styles.text}>{currencyFormat(totalHarga)}</Text>
    </View>
  );
};

export default itemMenuTerjual;

const styles = StyleSheet.create({
  container: {
    marginVertical: hp('1%'),
    marginHorizontal: hp('3%'),
    padding: hp('3%'),
    backgroundColor: '#34495e',
    borderRadius: hp('1%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: hp('2%'),
    color: '#fff',
  },
});
