import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import header from '../../../assets/image/headerflip.jpeg';
import logo from '../../../assets/image/img_logo.jpeg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useEffect, useState, useRef} from 'react/cjs/react.development';
import firestore from '@react-native-firebase/firestore';
import ItemChatInside from './itemChatInside.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationPage = () => {
  const [chatList, setChatList] = React.useState([]);
  const [itemId, setItemId] = React.useState('');
  const [bolChat, setBolChat] = React.useState(false);
  const scrollViewRef = React.useRef();
  const [inputText, setInputText] = React.useState('');
  const [namaPelanggan, setNamaPelanggan] = React.useState('');
  const [noMeja, setNoMeja] = React.useState('');

  function onResult(querySnapshot) {
    let id;
    let listIn = [];
    if (querySnapshot.size !== 0) {
      setBolChat(true);
      querySnapshot.forEach(documentSnapshot => {
        // console.log(documentSnapshot.data().pesan);
        setChatList(documentSnapshot.data().pesan);
        listIn = documentSnapshot.data().pesan;
        id = documentSnapshot.id;
        setItemId(id);
      });
      firestore()
        .collection('chatlog')
        .doc(id)
        .update({
          readPelanggan: listIn,
        })
        .then(() => {});
    } else {
      setBolChat(false);
    }
  }

  const realTimeGetFire = (nama, nomeja) => {
    console.log('masuk realtime get fire');
    const unSubscribe = firestore()
      .collection('chatlog')
      .where('meja', '==', nomeja)
      .where('pemesan', '==', nama)
      .onSnapshot(onResult, onError);
    return unSubscribe;
  };

  function onError(error) {
    console.error(error);
  }
  React.useEffect(() => {
    let unSubscribe;
    const bootstrapAsync = async () => {
      let nama;
      let nomeja;
      try {
        nama = await AsyncStorage.getItem('namaPemesan');
        nomeja = await AsyncStorage.getItem('nomorMeja');
      } catch (e) {
      } finally {
        // setNamaPemesan(nama);
        // setNoMeja(nomeja);
        console.log('get chat');
        setNamaPelanggan(nama);
        setNoMeja(nomeja);
        unSubscribe = realTimeGetFire(nama, nomeja);
      }
    };
    bootstrapAsync();
    return () => {
      unSubscribe();
    };
    // getStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTodayTimeDate = () => {
    let today = new Date();
    let time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    let date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    return [time, date];
  };

  const updateChat = text => {
    let dateTime = getTodayTimeDate();
    chatList.push({
      pengirim: 'pelanggan',
      pesan: text,
      waktu: dateTime[0],
      tanggal: dateTime[1],
    });
    if (bolChat) {
      firestore()
        .collection('chatlog')
        .doc(itemId)
        .update({
          pesan: chatList,
        })
        .then(() => {});
    } else {
      firestore()
        .collection('chatlog')
        .add({
          meja: noMeja,
          pemesan: namaPelanggan,
          pesan: chatList,
          readPelanggan: [],
          readPelayan: [],
        })
        .then(() => {});
    }
    setInputText('');
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View style={styles.header}>
        <Image style={styles.headerImage} source={header} />
        <Image style={styles.headerlogo} source={logo} />
      </View>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={(contentWidth, contentHeight) => {
          scrollViewRef.current.scrollToEnd({animated: true});
        }}>
        {chatList.map(item => {
          return (
            <ItemChatInside
              key={item.waktu}
              text={item.pesan}
              pengirim={item.pengirim}
              date={item.tanggal}
              time={item.waktu}
            />
          );
        })}
      </ScrollView>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Ketik Masukan..."
          placeholderTextColor="#7f8c8d"
          multiline={true}
          value={inputText}
          onChangeText={text => {
            setInputText(text);
          }}></TextInput>
        <TouchableOpacity
          style={styles.BtnSend}
          onPress={() => {
            updateChat(inputText);
          }}>
          <Text style={styles.btnText}>Kirim</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotificationPage;

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
    marginBottom: hp('5%'),
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
  BtnSend: {
    backgroundColor: '#f39c12',
    borderRadius: hp('4%'),
    paddingHorizontal: hp('1%'),
    paddingVertical: hp('1%'),
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('1.5%'),
  },
  inputView: {
    width: wp('80%'),
    backgroundColor: '#ecf0f1',
    borderRadius: hp('4%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 7,
    height: hp('10%'),
    maxHeight: hp('30%'),
    flexDirection: 'row',
    alignSelf: 'center',
  },
  inputText: {
    width: wp('60%'),
    fontSize: hp('1.7%'),
    color: '#7f8c8d',
  },
});
