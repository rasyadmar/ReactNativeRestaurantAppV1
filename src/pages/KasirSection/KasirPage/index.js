import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import header from '../../../assets/image/headerflip.jpeg';
import logo from '../../../assets/image/img_logo.jpeg';
import ItemListBayar from './itemListBayar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useState, useEffect} from 'react/cjs/react.development';
import firestore from '@react-native-firebase/firestore';

const KasirPage = ({navigation}) => {
  const [list, setList] = useState([]);
  const [listId, setListId] = useState([]);

  function onResult(querySnapshot) {
    let listGet = [];
    let listId = [];
    querySnapshot.forEach(documentSnapshot => {
      listGet.push(documentSnapshot.data());
      listId.push(documentSnapshot.id);
    });
    setList(listGet);
    setListId(listId);
  }

  function onError(error) {
    console.error(error);
  }

  const getListBayar = () => {
    console.log('Get List Kasir');
    let unSubscribe = firestore()
      .collection('pesanan')
      .onSnapshot(onResult, onError);
    return unSubscribe;
  };
  useEffect(() => {
    let unSubscribe = getListBayar();
    return () => {
      unSubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const DetailFunction = (namaPelanggan, nomorMeja) => {
    navigation.navigate('DetailPelangganKasir', {
      namaPelanggan: namaPelanggan,
      nomorMeja: nomorMeja,
    });
  };
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View style={styles.header}>
        <Image style={styles.headerImage} source={header} />
        <Image style={styles.headerlogo} source={logo} />
      </View>
      <Text style={styles.title}>Kasir</Text>
      {list.length === 0 && (
        <ScrollView
          vertical
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#7f8c8d', fontSize: hp('1.5%')}}>
            Tidak Ada Pesanan
          </Text>
        </ScrollView>
      )}
      {list.length !== 0 && (
        <ScrollView vertical>
          {list.map((item, i) => {
            return (
              <ItemListBayar
                key={listId[i]}
                namaPelanggan={item.pemesan}
                nomorMeja={item.meja}
                status={item.progress}
                id={listId[i]}
                detailFunction={() => DetailFunction(item.pemesan, item.meja)}
              />
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default KasirPage;

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
});
