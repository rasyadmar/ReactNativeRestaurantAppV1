/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Button,
  StyleSheet,
  Image,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {
  addToKeranjang,
  removeFromKeranjang,
  addJumlahPesanan,
  substractJumlahPesanan,
} from '../KeranjangPage';
import logo from '../../../assets/image/img_logo.jpeg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

let kodeRestoIn = 'Belum Ada Kode Restoran';
let dataPemesan = {};

export const setKodeRestoIn = kode => {
  kodeRestoIn = kode;
};

export const setPengguna = data => {
  dataPemesan = data;
};

export const getPengguna = () => {
  return dataPemesan;
};

const MainPage = ({route, navigation}) => {
  const {restoranCode} = route.params;

  const [atasNama, setAtasNama] = useState('');
  const [nomorMeja, setNomorMeja] = useState('');

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Nama Pemesan..."
          placeholderTextColor="#7f8c8d"
          onChangeText={text => setAtasNama(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Nomor Meja..."
          placeholderTextColor="#7f8c8d"
          onChangeText={text => setNomorMeja(text)}
        />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          // if (
          //   atasNama === '' ||
          //   nomorMeja === '' ||
          //   restoranCode === 'Scan QR Untuk Kode Restoran'
          // ) {
          //   ToastAndroid.show(
          //     'QR, Nomor Meja, Nama Pemesan Harus di Isi',
          //     ToastAndroid.LONG,
          //   );
          // } else {
          //   setPengguna({
          //     nama: atasNama,
          //     nomor: nomorMeja,
          //     restoran: restoranCode,
          //   });
          //   navigation.navigate('Menu', {
          //     namaPemesan: atasNama,
          //     nomorMeja: nomorMeja,
          //   });
          // }
          navigation.navigate('MenuPelanggan');
        }}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>PESAN</Text>
      </TouchableOpacity>
      <Text style={{color: '#7f8c8d', fontSize: 12}}>
        Kode Resto: {restoranCode}
      </Text>
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  logo: {
    width: wp('65%'),
    height: hp('20%'),
    marginHorizontal: wp('1%'),
    marginVertical: hp('1%'),
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width: wp('80%'),
    backgroundColor: '#ecf0f1',
    borderRadius: hp('4%'),
    height: hp('7%'),
    marginBottom: hp('2%'),
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: hp('7%'),
    color: '#7f8c8d',
  },
  loginBtn: {
    width: wp('80%'),
    backgroundColor: '#f39c12',
    borderRadius: hp('4%'),
    height: hp('7%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('8%'),
    marginBottom: hp('2%'),
  },
});
