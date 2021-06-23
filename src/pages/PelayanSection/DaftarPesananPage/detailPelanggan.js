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
import ItemDetail from './itemDetail';
import firestore from '@react-native-firebase/firestore';

const DetailPelanggan = ({route}) => {
  const {namaPelanggan, nomorMeja, idItem, pesanan, totalHarga} = route.params;
  const [progress, setProgress] = useState('');
  const [pesan, setPesan] = useState([]);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  const currencyFormat = num => {
    return 'Rp' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

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

  const changeProgress = progressIn => {
    firestore()
      .collection('pesanan')
      .doc(idItem)
      .update({
        progress: progressIn,
      })
      .then(() => {});
  };
  function onResult(querySnapshot) {
    querySnapshot.forEach(documentSnapshot => {
      setProgress(documentSnapshot.data().progress);
    });
  }

  function onError(error) {
    console.error(error);
  }

  function onResultChat(querySnapshot) {
    querySnapshot.forEach(documentSnapshot => {
      setPesan(documentSnapshot.data().pesan);
    });
  }

  function onErrorChat(error) {
    console.error(error);
  }
  const addNotifToUser = text => {
    let dateTime = getTodayTimeDate();
    firestore()
      .collection('chatlog')
      .where('pemesan', '==', namaPelanggan)
      .where('meja', '==', nomorMeja)
      .get()
      .then(querySnapshot => {
        pesan.push({
          pengirim: 'pelayan',
          pesan: text,
          waktu: dateTime[0],
          tanggal: dateTime[1],
        });
        if (querySnapshot.size === 0) {
          firestore()
            .collection('chatlog')
            .add({
              pemesan: namaPelanggan,
              meja: nomorMeja,
              pesan: pesan,
            })
            .then(() => {
              console.log('Chat Pelayan Added!');
            });
        } else {
          querySnapshot.forEach(documentSnapshot => {
            if (documentSnapshot.exists) {
              firestore()
                .collection('chatlog')
                .doc(documentSnapshot.id)
                .update({
                  pemesan: namaPelanggan,
                  meja: nomorMeja,
                  pesan: pesan,
                })
                .then(() => {
                  console.log('Komentar updated!');
                });
            }
          });
        }
      });
  };

  const getFireData = () => {
    firestore()
      .collection('pesanan')
      .where('meja', '==', nomorMeja)
      .where('pemesan', '==', namaPelanggan)
      .onSnapshot(onResult, onError);
  };

  const getChatFire = () => {
    firestore()
      .collection('chatlog')
      .where('meja', '==', nomorMeja)
      .where('pemesan', '==', namaPelanggan)
      .onSnapshot(onResultChat, onErrorChat);
  };

  useEffect(() => {
    getFireData();
    getChatFire();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{backgroundColor: '#fff', flex: 1, padding: hp('1%')}}>
      <View style={styles.header}>
        <Image style={styles.headerImage} source={header} />
        <Image style={styles.headerlogo} source={logo} />
      </View>
      <Text style={styles.title}>Detail Pesanan</Text>
      <Text style={styles.itemName}>Nama Pemesan: {namaPelanggan}</Text>
      <Text style={styles.itemName}>Nomor Meja: {nomorMeja}</Text>
      <ScrollView vertical>
        {pesanan.map(item => {
          return (
            <ItemDetail
              key={item.namaPesanan}
              namaItem={item.namaPesanan}
              jumlahItem={item.jumlah}
              hargaItem={item.totalHarga}
              linkGambar={item.linkGambar}
            />
          );
        })}
      </ScrollView>
      <View style={styles.footer}>
        <Text>
          <Text style={{color: '#7f8c8d', fontSize: hp('1.5%')}}>Total: </Text>
          <Text
            style={{
              fontWeight: 'bold',
              color: '#f39c12',
              fontSize: hp('2.5%'),
            }}>
            {currencyFormat(totalHarga)}
          </Text>
        </Text>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          {progress === 'Belum Di Proses' && (
            <>
              <Text style={{color: '#7f8c8d', fontSize: hp('1.3%')}}>
                Tekan Saat Siap DiProses:
              </Text>
              <TouchableOpacity
                style={styles.BtnGray}
                onPress={() => {
                  changeProgress('Sedang Di Proses');
                  addNotifToUser(
                    'Pesanan Anda Sedang Di Proses (Pesan Otomatis)',
                  );
                }}>
                <Text style={styles.btnText}>Proses Pesanan</Text>
              </TouchableOpacity>
            </>
          )}
          {progress === 'Sedang Di Proses' && (
            <>
              <Text style={{color: '#7f8c8d', fontSize: hp('1.3%')}}>
                Tekan Saat Siap DiAntar:
              </Text>
              <TouchableOpacity
                style={styles.BtnOrange}
                onPress={() => {
                  changeProgress('Sedang Di Antar');
                  addNotifToUser(
                    'Pesanan Anda Sedang Di Antar (Pesan Otomatis)',
                  );
                }}>
                <Text style={styles.btnText}>Antar Pesanan</Text>
              </TouchableOpacity>
            </>
          )}
          {progress === 'Sedang Di Antar' && (
            <TouchableOpacity style={styles.BtnGreen}>
              <Text style={styles.btnText}>{progress}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default DetailPelanggan;

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
