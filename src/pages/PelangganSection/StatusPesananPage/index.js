import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import header from '../../../assets/image/headerflip.jpeg';
import logo from '../../../assets/image/img_logo.jpeg';
import {useEffect, useState} from 'react/cjs/react.development';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';
import ItemBelanja from './ItemBelanja';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import SectionStatus from './SectionStatus';

const StatusPesananPage = ({navigation}) => {
  const [list, setList] = React.useState([]);
  const [listCatatan, setListCatatan] = React.useState([]);
  const [listStatus, setListStatus] = React.useState([]);
  const [totalHarga, setTotalHarga] = React.useState(0);
  const [progress, setProgress] = React.useState('');
  // const [namaPemesan, setNamaPemesan] = React.useState('');
  // const [noMeja, setNoMeja] = React.useState('');
  const [docName, setDocName] = React.useState('');

  const handleMassage = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('Status Pesanan Anda Telah DiPerbarui!');
    });

    return unsubscribe;
  };

  const returnStockWhenCancle = (menuName, returnedStok) => {
    let currentStok;
    firestore()
      .collection('menu')
      .doc(menuName)
      .get()
      .then(querySnapshot => {
        currentStok = querySnapshot.data().stok;
        firestore()
          .collection('menu')
          .doc(menuName)
          .update({
            stok: currentStok + returnedStok,
          })
          .then(() => {
            console.log(menuName + ' stock successfully returned');
          });
      });
  };

  const getReturnedStockValue = pesananKe => {
    let namaPesanan = [];
    let stokReturned = [];
    list.map(item => {
      if (item.pesananKe === pesananKe) {
        stokReturned.push(item.jumlah);
        let namaNoSpasi = item.namaPesanan.replace(/ /g, '');
        namaPesanan.push(namaNoSpasi);
      }
    });
    return [namaPesanan, stokReturned];
  };

  const deleteFireData = () => {
    console.log(docName);
    firestore()
      .collection('pesanan')
      .doc(docName)
      .delete()
      .then(() => {
        // AsyncStorage.setItem('statusPesan', 'belum');
        console.log('delete all pesanan successed');
        navigation.navigate('MenuPelanggan');
      });
  };

  function getUnique(array) {
    var uniqueArray = [];

    for (let i = 0; i < array.length; i++) {
      if (uniqueArray.indexOf(array[i]) === -1) {
        uniqueArray.push(array[i]);
      }
    }
    return uniqueArray;
  }

  const deleteBasedOnPesananKe = index => {
    let [returnedPesanan, returnedJumlah] = getReturnedStockValue(index + 1);

    returnedPesanan.map((item, i) => {
      returnStockWhenCancle(item, returnedJumlah[i]);
    });

    let listCatatanIn = listCatatan;
    listCatatanIn.splice(index, 1);

    let listStatusIn = listStatus;
    listStatusIn.splice(index, 1);

    let deletedCost = 0;
    let pesananYangTersisa = [];
    list.map(item => {
      if (item.pesananKe === index + 1) {
        deletedCost = deletedCost + item.totalHarga;
      } else {
        pesananYangTersisa.push(item.pesananKe);
      }
    });
    let pesananYangTersisaUnik = getUnique(pesananYangTersisa);

    let listPesananIn = list.filter(obj => {
      return obj.pesananKe !== index + 1;
    });
    console.log(listPesananIn);
    let pesananKeBaru = 1;
    pesananYangTersisaUnik.map(item => {
      listPesananIn.map(itemIN => {
        if (item === itemIN.pesananKe) {
          itemIN.pesananKe = pesananKeBaru;
        }
      });
      pesananKeBaru++;
    });
    // console.log(listPesananIn);
    if (listCatatan.length === 0) {
      deleteFireData();
    } else {
      firestore()
        .collection('pesanan')
        .doc(docName)
        .update({
          pesanan: listPesananIn,
          listStatus: listStatusIn,
          catatan: listCatatanIn,
          pesananKe: listCatatan.length,
          totalHarga: totalHarga - deletedCost,
        })
        .then(() => {
          console.log('delete based on pesanan ke successed');
          //mengembalikan stok ke tabel menu
        });
    }
  };

  const changeSampaiPerPesanan = indexStatus => {
    let listStatusSampaiIN = [];
    listStatus.map((item, i) => {
      if (i === indexStatus) {
        listStatusSampaiIN.push('Sampai');
      } else {
        listStatusSampaiIN.push(item);
      }
    });
    firestore()
      .collection('pesanan')
      .doc(docName)
      .update({
        listStatus: listStatusSampaiIN,
      })
      .then(() => {
        console.log('ListStatus is updated');
      });
  };

  const changeProgressToBayar = () => {
    let bayarList = [];
    listStatus.map(item => {
      bayarList.push('Bayar');
    });
    firestore()
      .collection('pesanan')
      .doc(docName)
      .update({
        listStatus: bayarList,
        progress: 'Bayar',
      })
      .then(() => {
        console.log('progress is updated!');
        navigation.navigate('GiveReviewPage');
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

  const updateProgressFire = progress => {
    firestore()
      .collection('pesanan')
      .doc(docName)
      .update({
        progress: progress,
      })
      .then(() => {
        console.log('by pelanggan progress is updated to ' + progress);
      });
  };
  const cekStatusPesanan = listStatusIN => {
    let countSampai = 0;
    // let sedang = false;
    // let diantar = false;
    for (let i = 0; i < listStatusIN.length; i++) {
      // if (listStatusIN[i] === 'Belum Di Proses') {
      //   sedang = false;
      //   diantar = false;
      //   updateProgressFire('Belum Di Proses');
      //   break;
      // } else if (listStatusIN[i] === 'Sedang Di Proses') {
      //   diantar = false;
      //   sedang = true;
      // } else if (listStatusIN[i] === 'Sedang Di Antar') {
      //   diantar = true;
      if (listStatusIN[i] === 'Sampai') {
        countSampai++;
      }
    }
    console.log(countSampai);
    console.log(listStatusIN.length);
    if (countSampai === listStatusIN.length) {
      updateProgressFire('Sampai');
      // sedang = false;
      // diantar = false;
    }
    // if (sedang) {
    //   updateProgressFire('Sedang Di Proses');
    // } else if (diantar) {
    //   updateProgressFire('Diantar');
    // }
  };

  function onResult(querySnapshot) {
    querySnapshot.forEach(documentSnapshot => {
      // console.log(documentSnapshot);
      console.log('get Status pesanan data');
      // console.log(documentSnapshot.data().pesanan);
      setList(documentSnapshot.data().pesanan);
      setDocName(documentSnapshot.id);
      setTotalHarga(documentSnapshot.data().totalHarga);
      setProgress(documentSnapshot.data().progress);
      setListCatatan(documentSnapshot.data().catatan);
      setListStatus(documentSnapshot.data().listStatus);
      cekStatusPesanan(documentSnapshot.data().listStatus);
    });
  }

  function onError(error) {
    console.error(error);
  }

  const realtimeGetFire = (nama, nomeja) => {
    const unSubscribe = firestore()
      .collection('pesanan')
      .where('meja', '==', nomeja)
      .where('pemesan', '==', nama)
      .onSnapshot(onResult, onError);
    return unSubscribe;
  };

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
        console.log('Get List Pesanan');
        unSubscribe = realtimeGetFire(nama, nomeja);
      }
    };
    // getStorage();
    bootstrapAsync();
    handleMassage();
    return () => {
      unSubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const currencyFormat = num => {
    return 'Rp' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View style={styles.header}>
        <Image style={styles.headerImage} source={header} />
        <Image style={styles.headerlogo} source={logo} />
      </View>
      <Text style={styles.title}>Status Pesanan</Text>
      {list.length === 0 && (
        <ScrollView
          vertical
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#7f8c8d', fontSize: hp('1.5%')}}>
            Tidak Ada Pesanan Yang Terkonfirmasi Dari Keranjang
          </Text>
        </ScrollView>
      )}
      {list.length !== 0 && (
        <ScrollView vertical>
          {listCatatan.map((item, i) => {
            let listPesanan = getPesananData(i + 1);
            return (
              <SectionStatus
                key={i}
                listPesanan={listPesanan}
                catatan={item}
                status={listStatus[i]}
                deleteFunction={() => {
                  deleteBasedOnPesananKe(i);
                }}
                updateSampai={() => {
                  changeSampaiPerPesanan(i);
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
              fontSize: hp('2.2%'),
            }}>
            {currencyFormat(totalHarga)}
          </Text>
        </Text>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          {/* {progress === 'Belum Di Proses' && (
            <>
              <Text style={{color: '#7f8c8d', fontSize: hp('1.3%')}}>
                Tekan Untuk Batalkan:
              </Text>
              <TouchableOpacity
                style={styles.BtnNotProcessed}
                onPress={() => {
                  deleteFireData();
                }}>
                <Text style={styles.btnText}>Belum Di Proses</Text>
              </TouchableOpacity>
            </>
          )}
          {progress === 'Sedang Di Proses' && (
            <>
              <TouchableOpacity style={styles.BtnProcessed}>
                <Text style={styles.btnText}>Sedang Di Proses</Text>
              </TouchableOpacity>
            </>
          )} */}
          {progress === 'Sampai' && (
            <>
              <Text style={{color: '#7f8c8d', fontSize: hp('1.3%')}}>
                Tekan Jika Sudah Sampai Dan Ingin Bayar:
              </Text>
              <TouchableOpacity
                style={styles.BtnDelivered}
                onPress={() => {
                  changeProgressToBayar();
                }}>
                <Text style={styles.btnText}>Sampai Ke Meja</Text>
              </TouchableOpacity>
            </>
          )}
          {progress === 'Bayar' && (
            <>
              <Text style={{color: '#7f8c8d', fontSize: hp('1.3%')}}>
                Silakan Bayar Ke Kasir:
              </Text>
              <View style={styles.BtnDelivered}>
                <Text style={styles.btnText}>Bayar</Text>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default StatusPesananPage;

const styles = StyleSheet.create({
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
  footer: {
    flexDirection: 'row',
    padding: wp('3%'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  BtnNotProcessed: {
    width: wp('31%'),
    backgroundColor: '#e74c3c',
    borderRadius: hp('4%'),
    height: hp('4.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: hp('0.5%'),
  },
  BtnDelivered: {
    padding: hp('1%'),
    backgroundColor: '#2ecc71',
    borderRadius: hp('4%'),
    height: hp('4.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: hp('0.5%'),
  },
  BtnProcessed: {
    width: wp('33%'),
    backgroundColor: '#f39c12',
    borderRadius: hp('4%'),
    height: hp('4.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: hp('0.5%'),
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
  },
});
