import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import storage from '@react-native-firebase/storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ItemPesanaMingguan = ({namaPesanan, jumlah, totalHarga, linkGambar}) => {
  const [urlGambar, setUrlGambar] = React.useState('');
  React.useEffect(() => {
    const bootstrapAsync = async () => {
      const url = await storage().ref(linkGambar).getDownloadURL();
      // console.log(linkGambar);
      setUrlGambar(url);
    };
    bootstrapAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const currencyFormat = num => {
    return 'Rp' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };
  return (
    <View style={styles.itemContainer}>
      <Image
        source={{
          uri: urlGambar,
        }}
        style={styles.itemImage}
      />
      <View style={styles.itemData}>
        <Text style={styles.itemName}>{namaPesanan}</Text>
        <Text style={styles.itemJumlah}>Jumlah: {jumlah}</Text>
        <Text style={styles.itemJumlah}>Harga: {totalHarga}</Text>
      </View>
    </View>
  );
};

export default ItemPesanaMingguan;

const styles = StyleSheet.create({
  itemContainer: {margin: 10, flexDirection: 'row'},
  itemData: {marginStart: wp('5%'), flex: 1},
  itemImage: {height: hp('10%'), width: wp('20%')},
  itemJumlah: {
    color: '#bdc3c7',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  itemName: {
    fontSize: hp('2.3%'),
    height: hp('6.5%'),
    color: '#7f8c8d',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
});
