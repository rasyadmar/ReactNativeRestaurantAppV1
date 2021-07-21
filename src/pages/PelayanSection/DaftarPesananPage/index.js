import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useState, useEffect} from 'react/cjs/react.development';
import header from '../../../assets/image/headerflip.jpeg';
import logo from '../../../assets/image/img_logo.jpeg';
import ItemPesanan from './itemPesanan';
import firestore from '@react-native-firebase/firestore';

const DaftarPesananPage = ({navigation}) => {
  const [listBelum, setListBelum] = React.useState([]);
  const [idBelum, setIdBelum] = React.useState([]);
  const [listSedang, setListSedang] = React.useState([]);
  const [idSedang, setIdSedang] = React.useState([]);
  const [listAntar, setListAntar] = React.useState([]);
  const [idAntar, setIdAntar] = React.useState([]);
  const [listSampai, setListSampai] = React.useState([]);
  const [idSampai, setIdSampai] = React.useState([]);
  const [listBayar, setListBayar] = React.useState([]);
  const [idBayar, setIdBayar] = React.useState([]);

  const filterPesananByStatus = (listGetIn, listIdIn, status) => {
    let filteredPesanan = [];
    let filteredId = [];
    listGetIn.map((item, i) => {
      if (item.progress === status) {
        filteredPesanan.push(item);
        filteredId.push(listIdIn[i]);
      }
    });
    return [filteredPesanan, filteredId];
  };

  const getPesananByStatus = (listGetIn, listIdIn) => {
    let belumList = filterPesananByStatus(
      listGetIn,
      listIdIn,
      'Belum Di Proses',
    );
    let sedangList = filterPesananByStatus(
      listGetIn,
      listIdIn,
      'Sedang Di Proses',
    );
    let antarList = filterPesananByStatus(
      listGetIn,
      listIdIn,
      'Sedang Di Antar',
    );
    let sampaiList = filterPesananByStatus(listGetIn, listIdIn, 'Sampai');
    let bayarList = filterPesananByStatus(listGetIn, listIdIn, 'Bayar');

    setListBelum(belumList[0]);
    setIdBelum(belumList[1]);

    setListSedang(sedangList[0]);
    setIdSedang(sedangList[1]);

    setListAntar(antarList[0]);
    setIdAntar(antarList[1]);

    setListSampai(sampaiList[0]);
    setIdSampai(sampaiList[1]);

    setListBayar(bayarList[0]);
    setIdBayar(bayarList[1]);
  };

  function onResult(querySnapshot) {
    let listGet = [];
    let listId = [];
    querySnapshot.forEach(documentSnapshot => {
      listGet.push(documentSnapshot.data());
      listId.push(documentSnapshot.id);
    });
    getPesananByStatus(listGet, listId);
  }

  function onError(error) {
    console.error(error);
  }

  const getFireData = () => {
    const unSubscribe = firestore()
      .collection('pesanan')
      .onSnapshot(onResult, onError);
    return unSubscribe;
  };

  React.useEffect(() => {
    let unSubscribe = getFireData();
    return () => {
      unSubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const DetailFunction = (namaPelanggan, nomorMeja, idItem) => {
    navigation.navigate('DetailPelanggan', {
      namaPelanggan: namaPelanggan,
      nomorMeja: nomorMeja,
      idItem: idItem,
    });
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View style={styles.header}>
        <Image style={styles.headerImage} source={header} />
        <Image style={styles.headerlogo} source={logo} />
      </View>
      <Text style={styles.title}>Daftar Pesanan Pelanggan</Text>
      <ScrollView vertical>
        <Text style={styles.type}>Belum Di Proses</Text>
        {listBelum.map((item, i) => {
          return (
            <ItemPesanan
              key={idBelum[i]}
              idItem={idBelum[i]}
              namaPelanggan={item.pemesan}
              nomorMeja={item.meja}
              status={item.progress}
              detailFunction={() =>
                DetailFunction(item.pemesan, item.meja, idBelum[i])
              }
            />
          );
        })}
        <Text style={styles.type}>Sedang Di Proses</Text>
        {listSedang.map((item, i) => {
          return (
            <ItemPesanan
              key={idSedang[i]}
              idItem={idSedang[i]}
              namaPelanggan={item.pemesan}
              nomorMeja={item.meja}
              status={item.progress}
              detailFunction={() =>
                DetailFunction(item.pemesan, item.meja, idSedang[i])
              }
            />
          );
        })}
        <Text style={styles.type}>Sedang Di Antar</Text>
        {listAntar.map((item, i) => {
          return (
            <ItemPesanan
              key={idAntar[i]}
              idItem={idAntar[i]}
              namaPelanggan={item.pemesan}
              nomorMeja={item.meja}
              status={item.progress}
              detailFunction={() =>
                DetailFunction(item.pemesan, item.meja, idAntar[i])
              }
            />
          );
        })}
        <Text style={styles.type}>Sampai Ke Meja</Text>
        {listSampai.map((item, i) => {
          return (
            <ItemPesanan
              key={idSampai[i]}
              idItem={idSampai[i]}
              namaPelanggan={item.pemesan}
              nomorMeja={item.meja}
              status={item.progress}
              detailFunction={() =>
                DetailFunction(item.pemesan, item.meja, idSampai[i])
              }
            />
          );
        })}
        <Text style={styles.type}>Siap Bayar</Text>
        {listBayar.map((item, i) => {
          return (
            <ItemPesanan
              key={idBayar[i]}
              idItem={idBayar[i]}
              namaPelanggan={item.pemesan}
              nomorMeja={item.meja}
              status={item.progress}
              detailFunction={() =>
                DetailFunction(item.pemesan, item.meja, idBayar[i])
              }
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default DaftarPesananPage;

const styles = StyleSheet.create({
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
    // backgroundColor: '#f39c12',
    textAlign: 'center',
    fontSize: hp('3.5%'),
    color: '#f39c12',
    fontWeight: 'bold',
    marginVertical: hp('1%'),
  },
  Btn: {
    width: wp('25%'),
    backgroundColor: '#f39c12',
    borderRadius: hp('4%'),
    height: hp('4.5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
  },
  type: {
    margin: hp('1%'),
    padding: hp('1%'),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(127, 140, 141,0.1)',
    fontSize: hp('2.5%'),
    color: '#7f8c8d',
  },
});
