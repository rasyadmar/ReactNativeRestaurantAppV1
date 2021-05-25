import React from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import header from '../../../assets/image/headerflip.jpeg';
import logo from '../../../assets/image/img_logo.jpeg';

const DetailRekapitulasi = ({route}) => {
  const {bulan} = route.params;
  const screenWidth = Dimensions.get('window').width;
  const data = {
    labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
    datasets: [
      {
        data: [20, 45, 28, 80],
        color: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`, // optional
        strokeWidth: 3, // optional
      },
    ],
    legend: ['Menu Terjual'], // optional
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
      <Text style={styles.title}>Grafik Rekapitulasi Menu</Text>
      <LineChart
        data={data}
        width={screenWidth}
        height={280}
        chartConfig={chartConfig}
      />
      <ScrollView></ScrollView>
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
