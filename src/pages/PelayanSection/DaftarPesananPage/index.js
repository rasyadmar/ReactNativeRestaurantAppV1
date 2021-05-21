import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useState, useEffect} from 'react/cjs/react.development';
import header from '../../../assets/image/headerflip.jpeg';
import logo from '../../../assets/image/img_logo.jpeg';
import ItemPesanan from './itemPesanan';

let dummyPesanan = [
  {
    id: 1,
    namaPelanggan: 'Budi',
    nomorMeja: '12a',
    pesanan: [
      {namaPesanan: 'Nila Bakar', jumlahPesanan: 2, hargaItem: 1000},
      {namaPesanan: 'Nila Asam Manis', jumlahPesanan: 1, hargaItem: 1000},
      {namaPesanan: 'Es Teh Manis', jumlahPesanan: 4, hargaItem: 100},
      {namaPesanan: 'Nasi Putih', jumlahPesanan: 4, hargaItem: 100},
    ],
    totalHarga: 10000,
    status: 'Belum',
  },
  {
    id: 2,
    namaPelanggan: 'Maman',
    nomorMeja: '13a',
    pesanan: [
      {namaPesanan: 'Nila Bakar', jumlahPesanan: 2, hargaItem: 1000},
      {namaPesanan: 'Nila Asam Manis', jumlahPesanan: 1, hargaItem: 1000},
      {namaPesanan: 'Es Teh Manis', jumlahPesanan: 4, hargaItem: 100},
      {namaPesanan: 'Nasi Putih', jumlahPesanan: 4, hargaItem: 100},
    ],
    totalHarga: 10000,
    status: 'Belum',
  },
  {
    id: 3,
    namaPelanggan: 'Rifki',
    nomorMeja: '14a',
    pesanan: [
      {namaPesanan: 'Nila Bakar', jumlahPesanan: 2, hargaItem: 1000},
      {namaPesanan: 'Nila Asam Manis', jumlahPesanan: 1, hargaItem: 1000},
      {namaPesanan: 'Es Teh Manis', jumlahPesanan: 4, hargaItem: 100},
      {namaPesanan: 'Nasi Putih', jumlahPesanan: 4, hargaItem: 100},
    ],
    totalHarga: 10000,
    status: 'Belum',
  },
  {
    id: 4,
    namaPelanggan: 'Lail',
    nomorMeja: '15a',
    pesanan: [
      {namaPesanan: 'Nila Bakar', jumlahPesanan: 2, hargaItem: 1000},
      {namaPesanan: 'Nila Asam Manis', jumlahPesanan: 1, hargaItem: 1000},
      {namaPesanan: 'Es Teh Manis', jumlahPesanan: 4, hargaItem: 100},
      {namaPesanan: 'Nasi Putih', jumlahPesanan: 4, hargaItem: 100},
    ],
    totalHarga: 10000,
    status: 'Belum',
  },
];

const DaftarPesananPage = ({navigation}) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(dummyPesanan);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const DetailFunction = (namaPelanggan, nomorMeja, pesanan, totalHarga) => {
    navigation.navigate('DetailPelanggan', {
      namaPelanggan: namaPelanggan,
      nomorMeja: nomorMeja,
      pesanan: pesanan,
      totalHarga: totalHarga,
    });
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View style={styles.header}>
        <Image style={styles.headerImage} source={header} />
        <Image style={styles.headerlogo} source={logo} />
      </View>
      <Text style={styles.title}>Daftar Pesanan Pelanggan</Text>
      <ScrollView vertical>
        {list.map(item => {
          return (
            <ItemPesanan
              key={item.id}
              namaPelanggan={item.namaPelanggan}
              nomorMeja={item.nomorMeja}
              status={item.status}
              detailFunction={() =>
                DetailFunction(
                  item.namaPelanggan,
                  item.nomorMeja,
                  item.pesanan,
                  item.totalHarga,
                )
              }
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default DaftarPesananPage;

const styles = StyleSheet.create({
  itemData: {marginStart: wp('5%'), flex: 1},
  itemImage: {height: hp('10%'), width: wp('20%')},
  itemJumlah: {
    color: '#bdc3c7',
    fontWeight: 'bold',
    fontFamily: 'monospace',
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
    width: wp('25%'),
    backgroundColor: '#f39c12',
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
