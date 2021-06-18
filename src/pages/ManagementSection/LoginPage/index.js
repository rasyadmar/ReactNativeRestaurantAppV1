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
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../../../utils/authContext';
import auth from '@react-native-firebase/auth';

const MainPage = ({route, navigation}) => {
  useEffect(() => {}, []);
  const {toManagement} = React.useContext(AuthContext);
  const [emailManager, setEmailManager] = useState('');
  const [password, setPassword] = useState('');

  const loginFireBase = () => {
    auth()
      .signInWithEmailAndPassword(emailManager, password)
      .then(() => {
        AsyncStorage.setItem('loginManagementStat', 'udahlogin');
        toManagement();
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          ToastAndroid.show('Format Email Salah', ToastAndroid.SHORT);
        }

        if (error.code === 'auth/user-not-found') {
          ToastAndroid.show('Akun Tidak Ditemukan', ToastAndroid.SHORT);
        }
        if (error.code === 'auth/wrong-password') {
          ToastAndroid.show('Password Salah', ToastAndroid.SHORT);
        }
        console.error(error);
      });
  };

  const run = () => {
    if (emailManager === '' || password === '') {
      ToastAndroid.show('Email dan Password Harus Diisi', ToastAndroid.LONG);
    } else {
      AsyncStorage.setItem('loginManagementStat', 'udahLogin');
      //   AsyncStorage.setItem('emailManager', emailManager);
      //   AsyncStorage.setItem('password', password);
      loginFireBase();
      toManagement();
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email Manager..."
          placeholderTextColor="#7f8c8d"
          onChangeText={text => setEmailManager(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          secureTextEntry={true}
          placeholder="Password..."
          placeholderTextColor="#7f8c8d"
          onChangeText={text => setPassword(text)}
        />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          run();
        }}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>LOGIN</Text>
      </TouchableOpacity>
      <Text style={styles.inputText}>Dapatkan Akun Dari Kantor Anda</Text>
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
