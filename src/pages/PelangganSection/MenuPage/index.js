import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import logo from '../../../assets/image/img_logo.jpeg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useEffect} from 'react/cjs/react.development';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../../../utils/authContext';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {deleteAll} from '../../../features/keranjangSlice';

export default function MenuPage({route, navigation}) {
  const dispatch = useDispatch();
  const {toQrScan} = React.useContext(AuthContext);

  const logOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('log Out');
      });
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <TouchableOpacity
        style={styles.Btn}
        onPress={() => {
          navigation.navigate('MakananPelanggan');
        }}>
        <Text style={styles.btnText}>Makanan</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Btn}
        onPress={() => {
          navigation.navigate('MinumanPelanggan');
        }}>
        <Text style={styles.btnText}>Minuman</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.Btn}
        onPress={() => {
          navigation.navigate('StatusPesananPelanggan');
        }}>
        <Text style={styles.btnText}>Status Pesanan</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Btn}
        onPress={() => {
          navigation.navigate('GiveReviewPage');
        }}>
        <Text style={styles.btnText}>Review Restoran</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.BtnFooter}
          onPress={() => {
            AsyncStorage.setItem('sekarang', 'belumregis');
            AsyncStorage.setItem('namaPemesan', '');
            AsyncStorage.setItem('nomorMeja', '');
            toQrScan();
            dispatch(deleteAll());
            try {
              logOut();
            } catch (e) {}
          }}>
          <Text style={styles.btnTextFooter}>Log Out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.BtnNotif}
          onPress={() => {
            navigation.navigate('NotificationPage');
          }}>
          <Text style={styles.btnTextNotif}>NOTIF</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
    width: wp('75%'),
    backgroundColor: '#f39c12',
    borderRadius: hp('4%'),
    height: hp('6%'),
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
    width: wp('80%'),
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
  BtnNotif: {
    width: wp('10%'),
    backgroundColor: '#f39c12',
    borderRadius: hp('7%'),
    height: hp('4.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: hp('0.5%'),
  },
  btnTextNotif: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('1.3%'),
  },
});
