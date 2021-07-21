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
import SectionPesanan from './SectionPesanan';
import firestore from '@react-native-firebase/firestore';

const DetailPelanggan = ({route}) => {
  const {namaPelanggan, nomorMeja, idItem} = route.params;
  const [progress, setProgress] = React.useState('');
  const [pesan, setPesan] = React.useState([]);
  const [list, setList] = React.useState([]);
  const [listCatatan, setListCatatan] = React.useState([]);
  const [listStatus, setListStatus] = React.useState([]);
  const [totalHarga, setTotalHarga] = React.useState(0);
  // const [time, setTime] = React.useState('');
  // const [date, setDate] = React.useState('');

  const currencyFormat = num => {
    return 'Rp' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const changePerPesanan = indexStatus => {
    let listStatusSampaiIN = [];
    listStatus.map((item, i) => {
      if (i === indexStatus) {
        if (item === 'Belum Di Proses') {
          listStatusSampaiIN.push('Sedang Di Proses');
        } else if (item === 'Sedang Di Proses') {
          listStatusSampaiIN.push('Sedang Di Antar');
        }
      } else {
        listStatusSampaiIN.push(item);
      }
    });
    firestore()
      .collection('pesanan')
      .doc(idItem)
      .update({
        listStatus: listStatusSampaiIN,
      })
      .then(() => {
        console.log('ListStatus is updated');
      });
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

  const updateProgressFire = progress => {
    firestore()
      .collection('pesanan')
      .doc(idItem)
      .update({
        progress: progress,
      })
      .then(() => {
        console.log('by dapur progress is updated to ' + progress);
      });
  };

  const cekStatusPesanan = listStatusIN => {
    // let countSampai = 0;
    let sedang = false;
    let diantar = false;
    for (let i = 0; i < listStatusIN.length; i++) {
      if (listStatusIN[i] === 'Belum Di Proses') {
        sedang = false;
        diantar = false;
        // updateProgressFire('Belum Di Proses');
        break;
      } else if (listStatusIN[i] === 'Sedang Di Proses') {
        diantar = false;
        sedang = true;
      } else if (listStatusIN[i] === 'Sedang Di Antar') {
        diantar = true;
      }
      // else if (listStatusIN[i] === 'Sampai') {
      //   countSampai++;
      // }
    }
    // if (countSampai === listStatusIN.length) {
    //   updateProgressFire('Sampai');
    //   sedang = false;
    //   diantar = false;
    // }
    if (sedang) {
      if (progress !== 'Sedang Di Proses') {
        updateProgressFire('Sedang Di Proses');
      }
    } else if (diantar) {
      if (progress !== 'Sedang Di Antar') {
        updateProgressFire('Sedang Di Antar');
      }
    }
  };
  function onResult(querySnapshot) {
    console.log('get Status pesanan data from dapur side');
    setProgress(querySnapshot.data().progress);
    setList(querySnapshot.data().pesanan);
    setTotalHarga(querySnapshot.data().totalHarga);
    setListCatatan(querySnapshot.data().catatan);
    setListStatus(querySnapshot.data().listStatus);
    cekStatusPesanan(querySnapshot.data().listStatus);
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
  const addNotifToUser = (pesananKe, status) => {
    let dateTime = getTodayTimeDate();
    let updateStatus;
    if (status === 'Belum Di Proses') {
      updateStatus = 'Sedang Di Proses';
    } else if (status === 'Sedang Di Proses') {
      updateStatus = 'Sedang Di Antar';
    }
    firestore()
      .collection('chatlog')
      .where('pemesan', '==', namaPelanggan)
      .where('meja', '==', nomorMeja)
      .get()
      .then(querySnapshot => {
        pesan.push({
          pengirim: 'pelayan',
          pesan:
            'Pesanan Ke ' +
            pesananKe +
            ' ' +
            updateStatus +
            ' (Pesan Otomatis)',
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
              readPelanggan: [],
              readPelayan: [],
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

  const getPesananData = pesananKe => {
    let pesananIn = [];

    list.map(item => {
      if (item.pesananKe === pesananKe) {
        pesananIn.push(item);
      }
    });
    return pesananIn;
  };

  const getFireData = () => {
    let unSubscribe = firestore()
      .collection('pesanan')
      .doc(idItem)
      .onSnapshot(onResult, onError);
    return unSubscribe;
  };

  const getChatFire = () => {
    let unSubscribe = firestore()
      .collection('chatlog')
      .where('meja', '==', nomorMeja)
      .where('pemesan', '==', namaPelanggan)
      .onSnapshot(onResultChat, onErrorChat);
    return unSubscribe;
  };

  React.useEffect(() => {
    let unSubChatFire = getChatFire();
    let unSubgetFireData = getFireData();
    return () => {
      unSubChatFire();
      unSubgetFireData();
    };
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
      {list.length === 0 && (
        <ScrollView
          vertical
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#7f8c8d', fontSize: hp('1.5%')}}>
            Pelanggan Belum Memesan
          </Text>
        </ScrollView>
      )}
      {list.length !== 0 && (
        <ScrollView vertical>
          {listCatatan.map((item, i) => {
            let listPesanan = getPesananData(i + 1);
            console.log(progress);
            return (
              <SectionPesanan
                key={i}
                listPesanan={listPesanan}
                catatan={item}
                status={listStatus[i]}
                updateStatus={() => {
                  changePerPesanan(i);
                  addNotifToUser(i + 1, listStatus[i]);
                }}
              />
            );
          })}
        </ScrollView>
      )}
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
              <View style={styles.BtnRed}>
                <Text style={styles.btnText}>Belum Di Proses</Text>
              </View>
            </>
          )}
          {progress === 'Sedang Di Proses' && (
            <>
              <View style={styles.BtnOrange}>
                <Text style={styles.btnText}>Sedang Di Proses</Text>
              </View>
            </>
          )}
          {progress === 'Sedang Di Antar' && (
            <View style={styles.BtnGreen}>
              <Text style={styles.btnText}>{progress}</Text>
            </View>
          )}
          {progress === 'Sampai' && (
            <View style={styles.BtnGreen}>
              <Text style={styles.btnText}>Sampai Ke Meja</Text>
            </View>
          )}
          {progress === 'Bayar' && (
            <View style={styles.BtnGreen}>
              <Text style={styles.btnText}>Bayar</Text>
            </View>
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
  BtnRed: {
    paddingHorizontal: hp('1%'),
    paddingVertical: hp('0,5%'),
    backgroundColor: 'red',
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
