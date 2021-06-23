import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import logo from '../../../assets/image/img_logo.jpeg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../../../utils/authContext';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {deleteAll} from '../../../features/keranjangSlice';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react/cjs/react.development';

export default function MenuPage({route, navigation}) {
  const dispatch = useDispatch();
  const {toQrScan} = React.useContext(AuthContext);
  const [notif, setNotif] = useState(0);

  const handleMassage = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('Status Pesanan Anda Telah DiPerbarui!');
    });

    return unsubscribe;
  };

  function onResult(querySnapshot) {
    if (querySnapshot.fixed) {
      querySnapshot.forEach(documentSnapshot => {
        setNotif(
          documentSnapshot.data().pesan.length -
            documentSnapshot.data().readPelanggan.length,
        );
      });
    }
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
      } catch (e) {}
      firestore()
        .collection('chatlog')
        .where('meja', '==', nomeja)
        .where('pemesan', '==', nama)
        .onSnapshot(onResult, onError);
    };
    handleMassage();
  }, []);

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
        {notif !== 0 && (
          <TouchableOpacity
            style={styles.BtnNotifOn}
            onPress={() => {
              navigation.navigate('NotificationPage');
            }}>
            <Text style={styles.btnTextNotif}>Chat Pelayan</Text>
            <Text style={styles.notif}>{notif}</Text>
          </TouchableOpacity>
        )}
        {notif === 0 && (
          <TouchableOpacity
            style={styles.BtnNotifOff}
            onPress={() => {
              navigation.navigate('NotificationPage');
            }}>
            <Text style={styles.btnTextNotif}>Chat Pelayan</Text>
          </TouchableOpacity>
        )}
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
  BtnNotifOn: {
    backgroundColor: '#f39c12',
    borderRadius: hp('7%'),
    alignItems: 'center',
    paddingEnd: hp('5.5%'),
    paddingStart: hp('2%'),
    justifyContent: 'center',
    marginLeft: hp('0.5%'),
    position: 'relative',
  },
  BtnNotifOff: {
    backgroundColor: '#f39c12',
    borderRadius: hp('7%'),
    alignItems: 'center',
    paddingHorizontal: hp('2%'),
    justifyContent: 'center',
    marginLeft: hp('0.5%'),
    position: 'relative',
  },
  notif: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    color: 'white',
    borderRadius: hp('4%'),
    paddingVertical: hp('0.5%'),
    paddingHorizontal: hp('1%'),
    fontSize: hp('1.8%'),
  },
  btnTextNotif: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('1.5%'),
  },
});
