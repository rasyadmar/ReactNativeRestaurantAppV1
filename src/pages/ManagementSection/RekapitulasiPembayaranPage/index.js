import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import header from '../../../assets/image/headerflip.jpeg';
import logo from '../../../assets/image/img_logo.jpeg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ItemBulanRekapitulasi from './itemBulanRekapitulasi';
import {ScrollView} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';

const RekapitulasiPembayaranPage = ({navigation}) => {
  const [bulan, setBulan] = useState([]);
  const [tahun, setTahun] = useState([]);
  const [listId, setListId] = useState([]);

  const getFireData = () => {
    let listBulan = [];
    let listTahun = [];
    let idList = [];
    firestore()
      .collection('DiBayar')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          listBulan.push(documentSnapshot.data().bulan);
          listTahun.push(documentSnapshot.data().tahun);
          idList.push(documentSnapshot.id);
        });
        setBulan(listBulan);
        setTahun(listTahun);
        setListId(idList);
      });
  };

  useEffect(() => {
    getFireData();
  }, []);

  const toDetailRekapitulasi = (bulan, tahun) => {
    navigation.navigate('DetailRekapitulasiBayar', {
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
      <Text style={styles.title}>Rekapitulasi Pembayaran</Text>
      <ScrollView>
        {bulan.map((item, i) => {
          return (
            <ItemBulanRekapitulasi
              key={listId[i]}
              bulan={item}
              tahun={tahun[i]}
              toDetailRekapitulasi={() => toDetailRekapitulasi(item, tahun[i])}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default RekapitulasiPembayaranPage;

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
