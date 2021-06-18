import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import header from '../../../assets/image/headerflip.jpeg';
import logo from '../../../assets/image/img_logo.jpeg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useEffect} from 'react/cjs/react.development';
import ItemDetail from './itemDetailPesanan';
import firestore from '@react-native-firebase/firestore';

const DetailPelanggan = ({route, navigation}) => {
  const {namaPelanggan, nomorMeja, pesanan, totalHarga} = route.params;

  const currencyFormat = num => {
    return 'Rp' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const bayarFunction = (namaPemesan, noMeja, totalHarga, pesanan) => {
    firestore()
      .collection('DiBayar')
      .add({
        pemesan: namaPemesan,
        meja: noMeja,
        pesanan: pesanan,
        totalHarga: totalHarga,
        tanggal: new Date().getDate(),
        bulan: new Date().getMonth(),
        tahun: new Date().getFullYear(),
      })
      .then(() => {
        navigation.navigate('KasirPage');
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
      });
  };

  useEffect(() => {
    console.log(pesanan);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{backgroundColor: '#fff', flex: 1, padding: hp('1%')}}>
      <View style={styles.header}>
        <Image style={styles.headerImage} source={header} />
        <Image style={styles.headerlogo} source={logo} />
      </View>
      <Text style={styles.title}>Detail Pesanan</Text>
      <Text style={styles.itemName}>Nama Pemesan: {namaPelanggan}</Text>
      <Text style={styles.itemName}>Nomor Meja: {nomorMeja}</Text>
      <ScrollView vertical>
        {pesanan.map(item => {
          return (
            <ItemDetail
              key={item.namaPesanan}
              namaItem={item.namaPesanan}
              jumlahItem={item.jumlah}
              hargaItem={item.totalHarga}
              linkGambar={item.linkGambar}
            />
          );
        })}
      </ScrollView>
      <View style={styles.footer}>
        <Text>
          <Text style={{color: '#7f8c8d', fontSize: hp('1.5%')}}>Total: </Text>
          <Text
            style={{
              fontWeight: 'bold',
              color: '#f39c12',
              fontSize: hp('2.5%'),
            }}>
            {currencyFormat(totalHarga)}
          </Text>
        </Text>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text style={{color: '#7f8c8d', fontSize: hp('1.3%')}}>
            Tekan Jika Dibayar:
          </Text>
          <TouchableOpacity
            style={styles.Btn}
            onPress={() => {
              bayarFunction(namaPelanggan, nomorMeja, totalHarga, pesanan);
            }}>
            <Text style={styles.btnText}>Bayar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DetailPelanggan;

const styles = StyleSheet.create({
  itemData: {marginStart: wp('5%'), flex: 1},
  itemImage: {height: hp('10%'), width: wp('20%')},
  itemJumlah: {
    color: '#bdc3c7',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: hp('2.5%'),
    height: hp('5%'),
    color: '#7f8c8d',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
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
    // backgroundColor: '#f39c12',
    textAlign: 'center',
    fontSize: hp('3.5%'),
    color: '#f39c12',
    fontWeight: 'bold',
    marginVertical: hp('1%'),
  },
  Btn: {
    width: wp('30%'),
    backgroundColor: 'green',
    borderRadius: hp('4%'),
    height: hp('4.5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
  },
});
