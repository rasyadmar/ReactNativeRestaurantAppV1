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
import firestore from '@react-native-firebase/firestore';

const RekapitulasiMenuPage = ({navigation}) => {
  const [bulan, setBulan] = React.useState([]);

  function getUnique(array) {
    var uniqueArray = [];

    for (let i = 0; i < array.length; i++) {
      let add = true;
      if (uniqueArray.length === 0) {
        uniqueArray.push(array[i]);
      } else {
        uniqueArray.map(item => {
          if (item.bulan === array[i].bulan && item.tahun === array[i].tahun) {
            add = false;
            console.log('ole');
          }
        });
        if (add) {
          uniqueArray.push(array[i]);
        }
      }
    }
    return uniqueArray;
  }

  const getFireData = () => {
    let listBulan = [];
    let idList = [];
    firestore()
      .collection('DiBayar')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          listBulan.push({
            bulan: documentSnapshot.data().bulan,
            tahun: documentSnapshot.data().tahun,
          });
          idList.push(documentSnapshot.id);
        });
        listBulan = getUnique(listBulan);
        setBulan(listBulan);
      });
  };

  React.useEffect(() => {
    getFireData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toDetailRekapitulasi = (bulan, tahun) => {
    navigation.navigate('DetailRekapitulasiMenu', {
      bulan: bulan,
      tahun: tahun,
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
        {bulan.map((item, i) => {
          return (
            <ItemBulanRekapitulasi
              key={i}
              bulan={item.bulan}
              tahun={item.tahun}
              toDetailRekapitulasi={() =>
                toDetailRekapitulasi(item.bulan, item.tahun)
              }
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
