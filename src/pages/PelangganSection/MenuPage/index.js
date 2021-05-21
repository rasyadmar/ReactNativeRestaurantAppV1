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

export default function MenuPage({route, navigation}) {
  // const {namaPemesan, nomorMeja} = route.params;

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
          // navigation.navigate('Keranjang', {
          //   namaPemesan: namaPemesan,
          //   nomorMeja: nomorMeja,
          // });
          navigation.navigate('KeranjangPelanggan');
        }}>
        <Text style={styles.btnText}>Keranjang</Text>
      </TouchableOpacity>
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
    fontSize: hp('2.5%'),
  },
});
