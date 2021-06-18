import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import logo from '../../../assets/image/img_logo.jpeg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../../../../utils/authContext';

const MainPage = ({navigation}) => {
  const {toQrScan} = React.useContext(AuthContext);
  const logOut = () => {
    AsyncStorage.setItem('loginManagementStat', 'belumlogin');
    auth()
      .signOut()
      .then(() => {
        toQrScan();
        console.log('log Out');
      });
  };
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <TouchableOpacity
        style={styles.Btn}
        onPress={() => {
          navigation.navigate('RatingPage');
        }}>
        <Text style={styles.btnText}>Rating Pelanggan</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Btn}
        onPress={() => {
          navigation.navigate('RekapitulasiMenuPage');
        }}>
        <Text style={styles.btnText}>Rekapitulasi Menu</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Btn}
        onPress={() => {
          navigation.navigate('RekapitulasiPembayaranPage');
        }}>
        <Text style={styles.btnText}>Rekapitulasi Pembayaran</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.BtnFooter}
          onPress={() => {
            AsyncStorage.setItem('loginManagementStat', 'belumlogin');
            try {
              logOut();
            } catch (e) {}
          }}>
          <Text style={styles.btnTextFooter}>Log Out</Text>
        </TouchableOpacity>
      </View>
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
  Btn: {
    width: wp('80%'),
    backgroundColor: '#f39c12',
    borderRadius: hp('4%'),
    height: hp('7%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('5%'),
    marginBottom: hp('2%'),
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
  footer: {
    width: wp('85%'),
    flexDirection: 'row-reverse',
    padding: wp('3%'),
    justifyContent: 'space-between',
  },
  BtnFooter: {
    width: wp('19%'),
    backgroundColor: '#f39c12',
    borderRadius: hp('4%'),
    height: hp('4.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: hp('0.5%'),
  },
  btnTextFooter: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
  },
});
