import React from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useState, useEffect} from 'react/cjs/react.development';
import header from '../../../assets/image/headerflip.jpeg';
import logo from '../../../assets/image/img_logo.jpeg';
import ItemMenuTerjual from './itemTotalTerjual';
import firestore from '@react-native-firebase/firestore';

const DetailRekapitulasi = ({route}) => {
  const {bulan, tahun} = route.params;
  const [textbulan, setTextBulan] = useState('');
  const [dataList, setDataList] = useState([]);
  const [mingguSatu, setMingguSatu] = useState(0);
  const [mingguDua, setMingguDua] = useState(0);
  const [mingguTiga, setMingguTiga] = useState(0);
  const [mingguEmpat, setMingguEmpat] = useState(0);

  const getFireData = () => {
    let listData = [];
    // let listId = [];
    firestore()
      .collection('DiBayar')
      .where('bulan', '==', bulan)
      .where('tahun', '==', tahun)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          console.log(documentSnapshot);
          listData.push(documentSnapshot.data());
          // listId.push(documentSnapshot.id);
        });
        sorting(listData);
        // setIdItem(listId);
      });
  };

  const sorting = sort => {
    let data1 = 0,
      data2 = 0,
      data3 = 0,
      data4 = 0;
    sort.map(item => {
      if (item.tanggal <= 7) {
        data1 = data1 + item.totalHarga;
      } else if (item.tanggal <= 14) {
        data2 = data2 + item.totalHarga;
      } else if (item.tanggal <= 28) {
        data3 = data3 + item.totalHarga;
      } else {
        data4 = data4 + item.totalHarga;
      }
    });
    setDataList([
      {minggu: 'Minggu 1', totalHarga: data1},
      {minggu: 'Minggu 2', totalHarga: data2},
      {minggu: 'Minggu 3', totalHarga: data3},
      {minggu: 'Minggu 4', totalHarga: data4},
    ]);
    setMingguSatu(data1);
    setMingguDua(data2);
    setMingguTiga(data3);
    setMingguEmpat(data4);
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

  const screenWidth = Dimensions.get('window').width;
  const data = {
    labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
    datasets: [
      {
        data: [mingguSatu, mingguDua, mingguTiga, mingguEmpat],
        color: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`, // optional
        strokeWidth: 3, // optional
      },
    ],
    legend: [textbulan], // optional
  };
  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.headerImage} source={header} />
        <Image style={styles.headerlogo} source={logo} />
      </View>
      <Text style={styles.title}>Grafik Rekapitulasi Bayar</Text>
      <LineChart
        data={data}
        width={screenWidth}
        height={280}
        chartConfig={chartConfig}
      />
      <ScrollView>
        {dataList.map(item => {
          return (
            <ItemMenuTerjual
              key={item.minggu}
              minggu={item.minggu}
              totalHarga={item.totalHarga}
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
});
