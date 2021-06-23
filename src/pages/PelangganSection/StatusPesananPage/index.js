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

const StatusPesananPage = ({navigation}) => {
  const [list, setList] = useState([]);
  const [totalHarga, setTotalHarga] = useState(0);
  const [progress, setProgress] = useState('');
  const [namaPemesan, setNamaPemesan] = useState('');
  const [noMeja, setNoMeja] = useState('');
  const [docName, setDocName] = useState('');

  const handleMassage = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('Status Pesanan Anda Telah DiPerbarui!');
    });

    return unsubscribe;
  };

  const deleteFireData = () => {
    console.log(docName);
    firestore()
      .collection('pesanan')
      .doc(docName)
      .delete()
      .then(() => {
        AsyncStorage.setItem('statusPesan', 'belum');
        navigation.navigate('MenuPelanggan');
      });
  };
  const changeProgress = () => {
    firestore()
      .collection('pesanan')
      .doc(docName)
      .update({
        progress: 'Bayar',
      })
      .then(() => {
        console.log('progress is updated!');
        navigation.navigate('GiveReviewPage');
      });
  };
  function onResult(querySnapshot) {
    querySnapshot.forEach(documentSnapshot => {
      console.log(documentSnapshot);
      setList(documentSnapshot.data().pesanan);
      setDocName(documentSnapshot.id);
      setTotalHarga(documentSnapshot.data().totalHarga);
      setProgress(documentSnapshot.data().progress);
    });
  }

  function onError(error) {
    console.error(error);
  }

  useEffect(() => {
    const bootstrapAsync = async () => {
      let nama;
      let nomeja;
      try {
        nama = await AsyncStorage.getItem('namaPemesan');
        nomeja = await AsyncStorage.getItem('nomorMeja');
      } catch (e) {
      } finally {
        setNamaPemesan(nama);
        setNoMeja(nomeja);
        console.log('Get List Pesanan');
        firestore()
          .collection('pesanan')
          .where('meja', '==', nomeja)
          .where('pemesan', '==', nama)
          .onSnapshot(onResult, onError);
      }
    };
    // getStorage();
    bootstrapAsync();
    handleMassage();
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
          {list.map(item => {
            return (
              <ItemBelanja
                key={item.namaPemesan}
                namaItem={item.namaPesanan}
                jumlahItem={item.jumlah}
                hargaItem={item.totalHarga}
                linkGambar={item.linkGambar}
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
          {progress === 'Belum Di Proses' && (
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
          )}
          {progress === 'Sedang Di Antar' && (
            <>
              <Text style={{color: '#7f8c8d', fontSize: hp('1.3%')}}>
                Tekan Jika Sudah Sampai Dan Ingin Bayar:
              </Text>
              <TouchableOpacity
                style={styles.BtnDelivered}
                onPress={() => {
                  changeProgress();
                }}>
                <Text style={styles.btnText}>Diantar</Text>
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
    width: wp('19%'),
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
