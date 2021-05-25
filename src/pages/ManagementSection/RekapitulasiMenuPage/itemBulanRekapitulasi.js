import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const itemBulanRekapitulasi = ({bulan, toDetailRekapitulasi}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={toDetailRekapitulasi}>
      <Text style={styles.text}>{bulan}</Text>
    </TouchableOpacity>
  );
};

export default itemBulanRekapitulasi;

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
