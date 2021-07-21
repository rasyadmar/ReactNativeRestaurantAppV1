import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ItemBelanja from './ItemBelanja';

const SectionStatus = ({
  listPesanan,
  catatan,
  status,
  deleteFunction,
  updateSampai,
}) => {
  React.useEffect(() => {
    // console.log(listPesanan);
    // console.log('ole');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      {listPesanan.map(item => {
        return (
          <ItemBelanja
            key={item.namaPemesan}
            namaItem={item.namaPesanan}
            jumlahItem={item.jumlah}
            hargaItem={item.totalHarga}
            linkGambar={item.linkGambar}
          />
        );
      })}
      <TextInput
        style={styles.inputText}
        placeholder="Tidak Ada Catatan Pesanan..."
        placeholderTextColor="#7f8c8d"
        editable={false}
        multiline={true}
        value={catatan}></TextInput>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        {status === 'Belum Di Proses' && (
          <>
            <Text style={{color: '#7f8c8d', fontSize: hp('1.3%')}}>
              Tekan Untuk Batalkan:
            </Text>
            <TouchableOpacity
              style={styles.BtnNotProcessed}
              onPress={deleteFunction}>
              <Text style={styles.btnText}>Belum Di Proses</Text>
            </TouchableOpacity>
          </>
        )}
        {status === 'Sedang Di Proses' && (
          <>
            <View style={styles.BtnProcessed}>
              <Text style={styles.btnText}>Sedang Di Proses</Text>
            </View>
          </>
        )}
        {status === 'Sedang Di Antar' && (
          <>
            <Text style={{color: '#7f8c8d', fontSize: hp('1.3%')}}>
              Tekan Jika Sudah Sampai:
            </Text>
            <TouchableOpacity
              style={styles.BtnDelivered}
              onPress={updateSampai}>
              <Text style={styles.btnText}>Diantar</Text>
            </TouchableOpacity>
          </>
        )}
        {status === 'Sampai' && (
          <>
            <View style={styles.BtnDelivered}>
              <Text style={styles.btnText}>Sampai</Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default SectionStatus;

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
  footer: {
    flexDirection: 'row',
    padding: wp('3%'),
    justifyContent: 'space-between',
  },
  Btn: {
    width: wp('19%'),
    backgroundColor: '#f39c12',
    borderRadius: hp('4%'),
    height: hp('4.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: hp('0.5%'),
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
  },
  inputText: {
    width: wp('80%'),
    backgroundColor: '#ecf0f1',
    alignSelf: 'center',
    borderRadius: hp('4%'),
    padding: 15,
    fontSize: hp('1.7%'),
    color: '#7f8c8d',
  },
  BtnNotProcessed: {
    width: wp('31%'),
    backgroundColor: '#e74c3c',
    borderRadius: hp('4%'),
    height: hp('4.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: hp('0.5%'),
    marginVertical: hp('1%'),
  },
  BtnDelivered: {
    width: wp('19%'),
    backgroundColor: '#2ecc71',
    borderRadius: hp('4%'),
    height: hp('4.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: hp('0.5%'),
    marginVertical: hp('1%'),
  },
  BtnProcessed: {
    width: wp('33%'),
    backgroundColor: '#f39c12',
    borderRadius: hp('4%'),
    height: hp('4.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: hp('0.5%'),
    marginVertical: hp('1%'),
  },
});
