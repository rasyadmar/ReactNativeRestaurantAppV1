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
  const [notif, setNotif] = React.useState(0);
  const [name, setName] = React.useState('');
  const [noMeja, setNoMeja] = React.useState('');

  const handleMassage = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('Status Pesanan Anda Telah DiPerbarui!');
    });

    return unsubscribe;
  };

  function onResult(querySnapshot) {
    console.log('ole');
    if (querySnapshot.length !== 0) {
      querySnapshot.forEach(documentSnapshot => {
        setNotif(
          documentSnapshot.data().pesan.length -
            documentSnapshot.data().readPelanggan.length,
        );
        console.log('ole');
        console.log(
          documentSnapshot.data().pesan.length -
            documentSnapshot.data().readPelanggan.length,
        );
      });
    }
  }

  function onError(error) {
    console.error(error);
  }

  const getChatFire = (nama, nomeja) => {
    let unSubscribe = firestore()
      .collection('chatlog')
      .where('meja', '==', nomeja)
      .where('pemesan', '==', nama)
      .onSnapshot(onResult, onError);

    return unSubscribe;
  };

  useEffect(() => {
    let unSubscribe;
    const bootstrapAsync = async () => {
      let nama;
      let nomeja;
      try {
        nama = await AsyncStorage.getItem('namaPemesan');
        nomeja = await AsyncStorage.getItem('nomorMeja');
      } catch (e) {}
      setNoMeja(nomeja);
      setName(nama);
      unSubscribe = getChatFire(nama, nomeja);
    };
    // handleMassage();
    bootstrapAsync();
    return () => {
      unSubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('log Out');
      });
  };

  const deletePesananAndChat = (namaPemesan, noMeja) => {
    firestore()
      .collection('pesanan')
      .where('meja', '==', noMeja)
      .where('pemesan', '==', namaPemesan)
      .get()
      .then(querySnapshot => {
        let id;
        querySnapshot.forEach(documentSnapshot => {
          id = documentSnapshot.id;
        });
        firestore()
          .collection('pesanan')
          .doc(id)
          .delete()
          .then(() => {
            console.log('delete pesanan from list pesanan');
          });
      });
    firestore()
      .collection('chatlog')
      .where('meja', '==', noMeja)
      .where('pemesan', '==', namaPemesan)
      .get()
      .then(querySnapshot => {
        let id2;
        querySnapshot.forEach(documentSnapshot => {
          id2 = documentSnapshot.id;
        });
        firestore()
          .collection('chatlog')
          .doc(id2)
          .delete()
          .then(() => {
            console.log('delete chat from list chat');
          });
      });
  };

  const pressLogout = (nameIn, noMejaIn) => {
    Alert.alert(
      'Peringatan',
      // 'Saat Logout Data Pesanan Anda dan Chat Anda Akan Di Hapus. Sudah Membayar Pesanan Anda',
      'Yakin Ingin LogOut?',
      [
        {text: 'Tidak', onPress: () => {}},
        {
          text: 'Ya',
          onPress: () => {
            AsyncStorage.setItem('sekarang', 'belumregis');
            AsyncStorage.setItem('namaPemesan', '');
            AsyncStorage.setItem('nomorMeja', '');
            toQrScan();
            dispatch(deleteAll());
            // deletePesananAndChat(nameIn, noMejaIn);
            try {
              logOut();
            } catch (e) {}
          },
        },
      ],
    );
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
            pressLogout(name, noMeja);
          }}>
          <Text style={styles.btnTextFooter}>Log Out</Text>
        </TouchableOpacity>
        {notif !== 0 && (
          <TouchableOpacity
            style={styles.BtnNotifOn}
            onPress={() => {
              navigation.navigate('NotificationPage');
            }}>
            <Text style={styles.btnTextNotif}>Chat Dapur</Text>
            <Text style={styles.notif}>{notif}</Text>
          </TouchableOpacity>
        )}
        {notif === 0 && (
          <TouchableOpacity
            style={styles.BtnNotifOff}
            onPress={() => {
              navigation.navigate('NotificationPage');
            }}>
            <Text style={styles.btnTextNotif}>Chat Dapur</Text>
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
