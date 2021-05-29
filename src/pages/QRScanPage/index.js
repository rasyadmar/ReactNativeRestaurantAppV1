import React, {Component} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useEffect, useState} from 'react/cjs/react.development';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../../utils/authContext';
import auth from '@react-native-firebase/auth';

export default function QRScanPage({navigation}) {
  const {toPelanggan, toPelayan, toManagement} = React.useContext(AuthContext);
  // const {management} = React.useContext(AuthContext);

  const onSuccess = e => {
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
    if (e.data === 'nariwipelanggan') {
      // navigation.navigate('MainPelanggan', {
      //   restoranCode: e.data,
      // });
      toPelanggan();
    } else if (e.data === 'nariwipelayan') {
      // navigation.navigate('MainPelayan');
      toPelayan();
    } else if (e.data === 'nariwimanagement') {
      // navigation.navigate('MainPageManagement');
      toManagement();
    }
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      bottomContent={<Text style={styles.textBold}>Scan QrCode</Text>}
    />
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: hp('10%'),
    padding: hp('32%'),
    color: '#777',
  },
  textBold: {
    fontWeight: 'bold',
    color: '#000',
  },
  buttonText: {
    fontSize: hp('24%'),
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

AppRegistry.registerComponent('default', () => QRScanPage);
