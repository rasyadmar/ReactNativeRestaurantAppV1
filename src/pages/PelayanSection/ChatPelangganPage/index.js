import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import header from '../../../assets/image/headerflip.jpeg';
import logo from '../../../assets/image/img_logo.jpeg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useEffect, useState} from 'react/cjs/react.development';
import firestore from '@react-native-firebase/firestore';
import ItemChat from './itemChat.js';

const ChatPelangganPage = ({navigation}) => {
  const [listChat, setListChat] = React.useState([]);
  const [listId, setlistId] = React.useState([]);

  function onResult(querySnapshot) {
    let listChatIn = [];
    let listIdIn = [];
    querySnapshot.forEach(documentSnapshot => {
      listChatIn.push(documentSnapshot.data());
      listIdIn.push(documentSnapshot.id);
    });
    setListChat(listChatIn);
    setlistId(listIdIn);
  }

  function onError(error) {
    console.error(error);
  }

  const getChat = () => {
    let unSubscribe = firestore()
      .collection('chatlog')
      .onSnapshot(onResult, onError);
    return unSubscribe;
  };

  const DetailFunction = (namaPelanggan, nomorMeja) => {
    console.log('move to chat page');
    navigation.navigate('HalamanChatPelayan', {
      namaPelanggan: namaPelanggan,
      nomorMeja: nomorMeja,
    });
  };

  React.useEffect(() => {
    let unSubscribe = getChat();
    console.log('Using Use Effect');
    return () => {
      unSubscribe();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{backgroundColor: '#fff', flex: 1, padding: hp('1%')}}>
      <View style={styles.header}>
        <Image style={styles.headerImage} source={header} />
        <Image style={styles.headerlogo} source={logo} />
      </View>
      <Text style={styles.title}>Chat Pelanggan</Text>
      <ScrollView>
        {listChat.map((item, i) => {
          return (
            <ItemChat
              key={listId[i]}
              namaPelanggan={item.pemesan}
              nomorMeja={item.meja}
              unReadMessage={item.pesan.length - item.readPelayan.length}
              detailFunction={() => {
                DetailFunction(item.pemesan, item.meja);
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ChatPelangganPage;

const styles = StyleSheet.create({
  itemData: {marginStart: wp('5%'), flex: 1},
  itemImage: {height: hp('10%'), width: wp('20%')},
  itemJumlah: {
    color: '#bdc3c7',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  BtnGray: {
    paddingHorizontal: hp('1%'),
    paddingVertical: hp('0,5%'),
    backgroundColor: 'gray',
    borderRadius: hp('4%'),
    height: hp('4.5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  BtnOrange: {
    paddingHorizontal: hp('1%'),
    paddingVertical: hp('0,5%'),
    backgroundColor: '#f39c12',
    borderRadius: hp('4%'),
    height: hp('4.5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  BtnGreen: {
    paddingHorizontal: hp('1%'),
    paddingVertical: hp('0,5%'),
    backgroundColor: 'green',
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
