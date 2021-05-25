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

let dummyDataMinggu = [
  {minggu: 'Minggu 1', totalHarga: 425310000},
  {minggu: 'Minggu 2', totalHarga: 524315000},
  {minggu: 'Minggu 3', totalHarga: 403120000},
  {minggu: 'Minggu 4', totalHarga: 112310000},
];

const DetailRekapitulasi = ({route}) => {
  const {bulan} = route.params;
  const [dummyMinggu, setDummyMinggu] = useState([]);
  useEffect(() => {
    setDummyMinggu(dummyDataMinggu);
  }, []);
  const screenWidth = Dimensions.get('window').width;
  const data = {
    labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
    datasets: [
      {
        data: [34, 24, 40, 50],
        color: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`, // optional
        strokeWidth: 3, // optional
      },
    ],
    legend: [bulan], // optional
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
        {dummyMinggu.map(item => {
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
