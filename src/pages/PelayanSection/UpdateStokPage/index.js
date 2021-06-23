import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useEffect, useState} from 'react/cjs/react.development';
import axios from 'axios';
import header from '../../../assets/image/headerflip.jpeg';
import logo from '../../../assets/image/img_logo.jpeg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ItemStok from './ItemStok';
import {TextInput} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const UpdatestokPage = () => {
  const [list, setList] = useState([]);
  const [id, setId] = useState([]);
  const [displayedList, setDisplayedList] = useState([]);
  const [displayedId, setDisplayedId] = useState([]);

  function onResult(querySnapshot) {
    let listIn = [];
    let idIn = [];
    console.log('Getting Menu From Database');
    querySnapshot.forEach(documentSnapshot => {
      listIn.push(documentSnapshot.data());
      idIn.push(documentSnapshot.id);
    });
    setId(idIn);
    setDisplayedId(idIn);
    setList(listIn);
    setDisplayedList(listIn);
  }

  function onError(error) {
    console.error(error);
  }

  const getFireData = () => {
    firestore().collection('menu').onSnapshot(onResult, onError);
  };
  useEffect(() => {
    getFireData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filteringList = filter => {
    let newList = [];
    let newIdList = [];
    list.map((item, i) => {
      if (item.nama.toUpperCase() === filter.toUpperCase()) {
        newList.push(item);
        newIdList.push(id[i]);
      }
    });
    if (newList.length === 0) {
      newList.push(...list);
      newIdList.push(...id);
    }
    setDisplayedList(newList);
    setDisplayedId(newIdList);
  };
  const getMenu = () => {
    axios.get('http://0.0.0.0:3000/MenuSemua').then(res => {
      setList(res.data);
    });
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View style={styles.header}>
        <Image style={styles.headerImage} source={header} />
        <Image style={styles.headerlogo} source={logo} />
      </View>
      <Text style={styles.title}>Update Stok</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Cari Menu..."
          placeholderTextColor="#7f8c8d"
          onChangeText={text => {
            filteringList(text);
          }}></TextInput>
      </View>
      <ScrollView vertical>
        {displayedList.map((item, i) => {
          return (
            <ItemStok
              key={displayedId[i]}
              idItemDiDB={displayedId[i]}
              namaItem={item.nama}
              jumlahItem={item.stok}
              linkGambar={item.linkGambar}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default UpdatestokPage;

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
  footer: {
    flexDirection: 'row',
    padding: wp('3%'),
    justifyContent: 'space-between',
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
  inputView: {
    width: wp('80%'),
    backgroundColor: '#ecf0f1',
    borderRadius: hp('4%'),
    height: hp('7%'),
    marginBottom: hp('2%'),
    justifyContent: 'center',
    padding: 20,
    alignSelf: 'center',
  },
  inputText: {
    height: hp('7%'),
    color: '#7f8c8d',
  },
});
