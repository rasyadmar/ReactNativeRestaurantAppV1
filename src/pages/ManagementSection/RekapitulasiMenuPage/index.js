import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import header from '../../../assets/image/headerflip.jpeg';
import logo from '../../../assets/image/img_logo.jpeg';
import ItemBulanRekapitulasi from './itemBulanRekapitulasi';

let Bulan = [
  'Januari 2021',
  'Februari 2021',
  'Maret 2021',
  'April 2021',
  'Mei 2021',
  'Juni 2021',
  'Juli 2021',
  'Agustus 2021',
  'September 2021',
  'Oktober 2021',
  'November 2021',
  'Desember 2021',
];

const RekapitulasiMenuPage = ({navigation}) => {
  const [bulan, setBulan] = useState([]);

  useEffect(() => {
    setBulan(Bulan);
  }, []);

  const toDetailRekapitulasi = bulan => {
    navigation.navigate('DetailRekapitulasiMenu', {
      bulan: bulan,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.headerImage} source={header} />
        <Image style={styles.headerlogo} source={logo} />
      </View>
      <Text style={styles.title}>Rekapitulasi Menu</Text>
      <ScrollView>
        {bulan.map(item => {
          return (
            <ItemBulanRekapitulasi
              key={item}
              bulan={item}
              toDetailRekapitulasi={() => toDetailRekapitulasi(item)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default RekapitulasiMenuPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerImage: {
    height: 100,
    width: 215,
  },
  headerlogo: {
    height: 100,
    width: 150,
  },
  title: {
    textAlign: 'center',
    fontSize: hp('3.5%'),
    color: '#f39c12',
    fontWeight: 'bold',
    marginVertical: hp('1%'),
  },
});
