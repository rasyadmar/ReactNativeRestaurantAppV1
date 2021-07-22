import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import header from '../../../assets/image/headerflip.jpeg';
import logo from '../../../assets/image/img_logo.jpeg';
import ItemPesananMingguan from './itemPesanaMingguan';

const RekapPermingguDetail = ({route}) => {
  const {bulan, tahun, minggu} = route.params;
  const [textbulan, setTextBulan] = React.useState('');
  const [list, setList] = React.useState([]);

  const formatingText = bulanIn => {
    let listBulan = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];
    return listBulan[bulanIn];
  };

  const getJumlahAndNamaPesanan = listIn => {
    let pesananBaru = [];
    let add = true;
    console.log('ole');
    listIn.map(item => {
      item.pesanan.map(itemPesanan => {
        if (pesananBaru.length === 0) {
          //   console.log('uab');
          //   console.log(itemPesanan.namaPesanan);
          pesananBaru.push({
            namaPesanan: itemPesanan.namaPesanan,
            jumlah: itemPesanan.jumlah,
            harga: itemPesanan.totalHarga,
            linkGambar: itemPesanan.linkGambar,
          });
        } else {
          //   console.log(itemPesanan.namaPesanan);
          pesananBaru.map((itemIn, i) => {
            if (itemPesanan.namaPesanan === itemIn.namaPesanan) {
              console.log('tole');
              //   console.log(itemPesanan.namaPesanan);
              add = false;
              pesananBaru[i].jumlah =
                pesananBaru[i].jumlah + itemPesanan.jumlah;
              pesananBaru[i].harga =
                pesananBaru[i].harga + itemPesanan.totalHarga;
            } else {
              add = true;
            }
          });
          if (add) {
            pesananBaru.push({
              namaPesanan: itemPesanan.namaPesanan,
              jumlah: itemPesanan.jumlah,
              harga: itemPesanan.totalHarga,
              linkGambar: itemPesanan.linkGambar,
            });
          }
        }
      });
    });
    setList(pesananBaru);
  };

  const sorting = sort => {
    let selectedData = [];
    sort.map(item => {
      if (minggu === 'Minggu 1') {
        if (item.tanggal <= 7) {
          selectedData.push(item);
        }
      } else if (minggu === 'Minggu 2') {
        if (item.tanggal <= 14) {
          selectedData.push(item);
        }
      } else if (minggu === 'Minggu 3') {
        if (item.tanggal <= 28) {
          selectedData.push(item);
        }
      } else if (minggu === 'Minggu 4') {
        if (item.tanggal <= 31) {
          selectedData.push(item);
        }
      }
    });
    getJumlahAndNamaPesanan(selectedData);
  };

  const getFoodDataFire = () => {
    let listData = [];
    // let listId = [];
    firestore()
      .collection('DiBayar')
      .where('bulan', '==', bulan)
      .where('tahun', '==', tahun)
      .get()
      .then(querySnapshot => {
        console.log('getting rekapitulasi data from detail minggu');
        querySnapshot.forEach(documentSnapshot => {
          //   console.log(documentSnapshot);
          listData.push(documentSnapshot.data());
          // listId.push(documentSnapshot.id);
        });
        sorting(listData);
        // setIdItem(listId);
      });
  };

  React.useEffect(() => {
    getFoodDataFire();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.headerImage} source={header} />
        <Image style={styles.headerlogo} source={logo} />
      </View>
      <Text style={styles.title}>
        Pemesanan {formatingText(bulan)} {tahun}
      </Text>
      <Text style={styles.title}>{minggu}</Text>
      <ScrollView>
        {list.map((item, i) => {
          return (
            <ItemPesananMingguan
              key={i}
              namaPesanan={item.namaPesanan}
              jumlah={item.jumlah}
              totalHarga={item.harga}
              linkGambar={item.linkGambar}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default RekapPermingguDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    textAlign: 'center',
    fontSize: hp('3.5%'),
    color: '#f39c12',
    fontWeight: 'bold',
    marginVertical: hp('1%'),
  },
});
