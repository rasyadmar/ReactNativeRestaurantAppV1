import React from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import {LineChart, BarChart} from 'react-native-chart-kit';
import {ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useState, useEffect} from 'react/cjs/react.development';
import header from '../../../assets/image/headerflip.jpeg';
import logo from '../../../assets/image/img_logo.jpeg';
import ItemMenuTerjual from './itemMenuTerjual';
import ItemMenuFav from './itemMenuFav';
import firestore from '@react-native-firebase/firestore';

const DetailRekapitulasi = ({navigation, route}) => {
  const {bulan, tahun} = route.params;
  const [textbulan, setTextBulan] = useState('');
  const [dataList, setDataList] = useState([]);
  const [listTopRated, setListTopRated] = useState([
    {
      namaPesanan: '',
      jumlah: 0,
      harga: 0,
      linkGambar: '',
    },
    {
      namaPesanan: '',
      jumlah: 0,
      harga: 0,
      linkGambar: '',
    },
    {
      namaPesanan: '',
      jumlah: 0,
      harga: 0,
      linkGambar: '',
    },
    {
      namaPesanan: '',
      jumlah: 0,
      harga: 0,
      linkGambar: '',
    },
    {
      namaPesanan: '',
      jumlah: 0,
      harga: 0,
      linkGambar: '',
    },
  ]);

  const getFireData = () => {
    let listData = [];
    // let listId = [];
    firestore()
      .collection('DiBayar')
      .where('bulan', '==', bulan)
      .where('tahun', '==', tahun)
      .get()
      .then(querySnapshot => {
        console.log('getting data from rekapitulasi menu');
        querySnapshot.forEach(documentSnapshot => {
          // console.log(documentSnapshot);
          listData.push(documentSnapshot.data());
          // listId.push(documentSnapshot.id);
        });
        sorting(listData);
        // setIdItem(listId);
        getJumlahAndNamaPesanan(listData);
      });
  };

  const sortByRating = array => {
    let temp;
    for (let i = 1; i < array.length; i++) {
      for (let j = i; j > 0; j--) {
        if (array[j].jumlah > array[j - 1].jumlah) {
          temp = array[j];
          array[j] = array[j - 1];
          array[j - 1] = temp;
        }
      }
    }
    if (array.length < 5) {
      for (let i = array.length; i < 5; i++) {
        array[i] = {jumlah: 0, namaPesanan: 'Tidak Ada Pesanan'};
      }
    }
    console.log(array);
    setListTopRated(array);
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
    // console.log(pesananBaru);
    sortByRating(pesananBaru);
  };

  const sorting = sort => {
    // console.log(sort);
    let data1 = 0,
      data2 = 0,
      data3 = 0,
      data4 = 0;
    sort.map(item => {
      if (item.tanggal <= 7) {
        item.pesanan.map(itemIn => {
          data1 = data1 + itemIn.jumlah;
        });
      } else if (item.tanggal <= 14) {
        item.pesanan.map(itemIn => {
          data2 = data2 + itemIn.jumlah;
        });
      } else if (item.tanggal <= 28) {
        item.pesanan.map(itemIn => {
          data3 = data3 + itemIn.jumlah;
        });
      } else {
        item.pesanan.map(itemIn => {
          data4 = data4 + itemIn.jumlah;
        });
      }
    });
    setDataList([
      {minggu: 'Minggu 1', totalMenu: data1},
      {minggu: 'Minggu 2', totalMenu: data2},
      {minggu: 'Minggu 3', totalMenu: data3},
      {minggu: 'Minggu 4', totalMenu: data4},
    ]);
  };
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
    setTextBulan(listBulan[bulanIn]);
  };

  useEffect(() => {
    getFireData();
    formatingText(bulan);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const screenWidth = (Dimensions.get('window').width * 96) / 100;
  const data = {
    labels: ['(1)', '(2)', '(3)', '(4)', '(5)'],
    datasets: [
      {
        data: [
          listTopRated[0].jumlah,
          listTopRated[1].jumlah,
          listTopRated[2].jumlah,
          listTopRated[3].jumlah,
          listTopRated[4].jumlah,
        ],
        color: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`, // optional
        strokeWidth: 3, // optional
      },
    ],
    legend: [textbulan], // optional
  };
  const chartConfig = {
    backgroundGradientFrom: 'orange',
    backgroundGradientFromOpacity: 0.8,
    backgroundGradientTo: 'orange',
    backgroundGradientToOpacity: 0.8,
    fillShadowGradientOpacity: 0.9,
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false, // optional
  };

  const moveToRekapPermingguDetail = (bulan, tahun, minggu) => {
    navigation.navigate('RekapPermingguDetail', {
      bulan: bulan,
      tahun: tahun,
      minggu: minggu,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.headerImage} source={header} />
        <Image style={styles.headerlogo} source={logo} />
      </View>
      <Text style={styles.title}>Grafik Menu Favorit</Text>
      <BarChart
        data={data}
        width={screenWidth}
        height={280}
        chartConfig={chartConfig}
        showValuesOnTopOfBars={true}
        style={{margin: hp('1%'), borderRadius: hp('2%')}}
      />
      <ScrollView>
        <Text style={styles.type}>Pesanan Terlaris</Text>
        {listTopRated.map((item, i) => {
          return (
            <ItemMenuFav
              key={i}
              minggu={item.namaPesanan}
              terjual={item.jumlah}
            />
          );
        })}
        <Text style={styles.type}>Detail Pesanan Perminggu</Text>
        {dataList.map(item => {
          return (
            <ItemMenuTerjual
              key={item.minggu}
              minggu={item.minggu}
              terjual={item.totalMenu}
              moveToDetailMinggu={() => {
                moveToRekapPermingguDetail(bulan, tahun, item.minggu);
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default DetailRekapitulasi;

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
  type: {
    margin: hp('1%'),
    padding: hp('1%'),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(127, 140, 141,0.1)',
    fontSize: hp('2.5%'),
    color: '#7f8c8d',
  },
});
