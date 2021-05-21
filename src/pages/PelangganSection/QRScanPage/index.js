'use strict';

import React, {Component} from 'react';
import setNamaPengguna from '../MainPage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

export default function QRScanPage({navigation}) {
  const onSuccess = e => {
    // setNamaPengguna(e.data);
    navigation.navigate('MainPelanggan', {
      restoranCode: e.data,
    });
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      topContent={
        <Text style={styles.centerText}>
          Scan <Text style={styles.textBold}>Kode Restoran</Text>
        </Text>
      }
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
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: hp('21%'),
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

AppRegistry.registerComponent('default', () => QRScanPage);
