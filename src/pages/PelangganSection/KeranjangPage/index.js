/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
} from 'react-native';
import {useEffect, useState} from 'react/cjs/react.development';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import header from '../../../assets/image/headerflip.jpeg';
import logo from '../../../assets/image/img_logo.jpeg';
import ItemBelanja from './ItemBelanja';
import {useSelector} from 'react-redux';
import {selectKeranjang} from '../../../features/keranjangSlice';
import {selectPesanStatus} from '../../../features/statusPesanSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import {useDispatch} from 'react-redux';
import {deleteAll} from '../../../features/keranjangSlice';

const KERANJANG = 'List Keranjang Presistence';

const KeranjangPage = ({navigation, route}) => {
  const {statusPesan} = route.params;
  const dispatch = useDispatch();
  const [list, setList] = React.useState([]);
  const [totalHarga, setTotalHarga] = React.useState(0);
  const [namaPemesa, setNamaPemesan] = React.useState('');
  const [noMeja, setNoMeja] = React.useState('');
  const [token, setToken] = React.useState('');
  const [catatIn, setCatatIn] = React.useState('');
  let keranjang = useSelector(selectKeranjang);

  const handleMassage = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('Status Pesanan Anda Telah DiPerbarui!');
    });

    return unsubscribe;
  };

  const cekHarga = items => {
    let harga = 0;
    if (items.length) {
      items.map(item => {
        harga = harga + item.harga * item.qty;
      });
    }
    setTotalHarga(harga);
  };

  const deleteAllKeranjang = () => {
    dispatch(deleteAll());
  };

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let nama;
      let nomeja;
      try {
        nama = await AsyncStorage.getItem('namaPemesan');
        nomeja = await AsyncStorage.getItem('nomorMeja');
      } catch (e) {}
      setNamaPemesan(nama);
      setNoMeja(nomeja);
    };
    setList(keranjang);
    cekHarga(keranjang);
    bootstrapAsync();
    messaging()
      .getToken()
      .then(token => {
        setToken(token);
      });
    handleMassage();
  }, [keranjang]);

  const currencyFormat = num => {
    return 'Rp' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const submitPressed = () => {
    Alert.alert(
      'Peringatan',
      'Saat Pesanan Sudah Diproses, Pesanan Tidak Bisa di Batalkan.\nYakin Ingin Melanjutkan?',
      [
        {text: 'Tidak', onPress: () => {}},
        {
          text: 'Ya',
          onPress: () => {
            let pesanan = [];
            let catatan = [];
            let pesananUpdate = [];
            let statusTiapPesanan = [];
            let id;
            let pesananKeIn;
            let hargaDulu;
            let hargaSekarang;
            list.map(item => {
              pesanan.push({
                jumlah: item.qty,
                linkGambar: item.linkGambar,
                namaPesanan: item.nama,
                totalHarga: item.harga * item.qty,
                pesananKe: 1,
              });
              firestore()
                .collection('menu')
                .doc(item.id)
                .get()
                .then(documentSnapshot => {
                  if (documentSnapshot.exists) {
                    firestore()
                      .collection('menu')
                      .doc(item.id)
                      .update({
                        stok: documentSnapshot.data().stok - item.qty,
                      })
                      .then(() => {
                        console.log('stok is updated!');
                      });
                  }
                });
            });
            firestore()
              .collection('pesanan')
              .where('pemesan', '==', namaPemesa)
              .where('meja', '==', noMeja)
              .get()
              .then(querySnapshot => {
                if (querySnapshot.size !== 0) {
                  querySnapshot.forEach(documentSnapshot => {
                    catatan = documentSnapshot.data().catatan;
                    id = documentSnapshot.id;
                    pesananKeIn = documentSnapshot.data().pesananKe;
                    pesananUpdate = documentSnapshot.data().pesanan;
                    statusTiapPesanan = documentSnapshot.data().listStatus;
                    hargaDulu = documentSnapshot.data().totalHarga;
                  });
                  catatan.push(catatIn);
                  pesanan.map(item => {
                    item.pesananKe = pesananKeIn + 1;
                    pesananUpdate.push(item);
                  });
                  hargaSekarang = totalHarga + hargaDulu;
                  statusTiapPesanan.push('Belum Di Proses');
                  console.log(pesananUpdate);
                  firestore()
                    .collection('pesanan')
                    .doc(id)
                    .update({
                      catatan: catatan,
                      pesanan: pesananUpdate,
                      pesananKe: pesananKeIn + 1,
                      listStatus: statusTiapPesanan,
                      totalHarga: hargaSekarang,
                      progress: 'Belum Di Proses',
                    })
                    .then(() => {
                      deleteAllKeranjang();
                      navigation.navigate('MenuPelanggan');
                    });
                } else {
                  catatan.push(catatIn);
                  firestore()
                    .collection('pesanan')
                    .add({
                      pemesan: namaPemesa,
                      meja: noMeja,
                      pesanan: pesanan,
                      catatan: catatan,
                      progress: 'Belum Di Proses',
                      totalHarga: totalHarga,
                      token: token,
                      pesananKe: 1,
                      listStatus: ['Belum Di Proses'],
                    })
                    .then(() => {
                      deleteAllKeranjang();
                      navigation.navigate('MenuPelanggan');
                    });
                }
              });
          },
        },
      ],
    );
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View style={styles.header}>
        <Image style={styles.headerImage} source={header} />
        <Image style={styles.headerlogo} source={logo} />
      </View>
      <Text style={styles.title}>Keranjang</Text>

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
          {list.map(item => {
            return (
              <ItemBelanja
                key={item.nama}
                namaItem={item.nama}
                jumlahItem={item.stok}
                hargaItem={item.harga}
                linkGambar={item.linkGambar}
              />
            );
          })}
          <TextInput
            style={styles.inputText}
            placeholder="Beri Catatan Pesanan..."
            placeholderTextColor="#7f8c8d"
            multiline={true}
            value={catatIn}
            onChangeText={text => {
              setCatatIn(text);
            }}></TextInput>
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
        <View style={{flexDirection: 'row'}}>
          {list.length !== 0 && (
            <TouchableOpacity
              style={styles.Btn}
              onPress={() => {
                submitPressed();
              }}>
              {statusPesan === 'sudah' && (
                <Text style={styles.btnText}>Pesan Lagi</Text>
              )}
              {statusPesan === 'belum' && (
                <Text style={styles.btnText}>Pesan</Text>
              )}
            </TouchableOpacity>
          )}
          {list.length === 0 && (
            <View style={styles.Btn}>
              <Text style={styles.btnText}>Tidak Ada Pesanan</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default KeranjangPage;

const styles = StyleSheet.create({
  itemContainer: {margin: 10, flexDirection: 'row'},
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
    padding: hp('1%'),
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
  inputText: {
    width: wp('80%'),
    backgroundColor: '#ecf0f1',
    alignSelf: 'center',
    borderRadius: hp('4%'),
    padding: 15,
    fontSize: hp('1.7%'),
    color: '#7f8c8d',
  },
});
