import React from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useState, useEffect} from 'react/cjs/react.development';
import header from '../../../assets/image/headerflip.jpeg';
import logo from '../../../assets/image/img_logo.jpeg';
import ItemTotalTerjual from './itemTotalTerjual';
import firestore from '@react-native-firebase/firestore';

const DetailRekapitulasi = ({navigation, route}) => {
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
        console.log('getting rekapitulasi bayar data');
        querySnapshot.forEach(documentSnapshot => {
          // console.log(documentSnapshot);
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

  const currencyFormat = num => {
    return 'Rp' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const moveToRekapPermingguDetail = (bulan, tahun, minggu) => {
    navigation.navigate('RekapPermingguDetail', {
      bulan: bulan,
      tahun: tahun,
      minggu: minggu,
    });
  };

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
    fillShadowGradientOpacity: 0.9,
    color: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false, // optional
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.headerImage} source={header} />
        <Image style={styles.headerlogo} source={logo} />
      </View>
      <Text style={styles.title}>Grafik Rekapitulasi Bayar</Text>
      <BarChart
        data={data}
        width={screenWidth}
        height={280}
        yAxisLabel="Rp"
        chartConfig={chartConfig}
        withInnerLines={false}
        showValuesOnTopOfBars={true}
      />
      <ScrollView>
        {dataList.map(item => {
          return (
            <ItemTotalTerjual
              key={item.minggu}
              minggu={item.minggu}
              totalHarga={item.totalHarga}
              moveToDetailMinggu={() => {
                moveToRekapPermingguDetail(bulan, tahun, item.minggu);
              }}
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
              fontSize: hp('2.2%'),
            }}>
            {currencyFormat(mingguSatu + mingguDua + mingguTiga + mingguEmpat)}
          </Text>
        </Text>
      </View>
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
