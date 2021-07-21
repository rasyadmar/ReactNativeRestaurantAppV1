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
import ItemDetail from './itemDetail';

const SectionPesanan = ({listPesanan, catatan, status, updateStatus}) => {
  return (
    <View>
      {listPesanan.map((item, i) => {
        return (
          <ItemDetail
            key={i}
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
              Tekan Saat Siap DiProses:
            </Text>
            <TouchableOpacity
              style={styles.BtnNotProcessed}
              onPress={updateStatus}>
              <Text style={styles.btnText}>Belum Di Proses</Text>
            </TouchableOpacity>
          </>
        )}
        {status === 'Sedang Di Proses' && (
          <>
            <Text style={{color: '#7f8c8d', fontSize: hp('1.3%')}}>
              Tekan Saat Siap DiAntar:
            </Text>
            <TouchableOpacity
              style={styles.BtnProcessed}
              onPress={updateStatus}>
              <Text style={styles.btnText}>Sedang Di Proses</Text>
            </TouchableOpacity>
          </>
        )}
        {status === 'Sedang Di Antar' && (
          <>
            <View style={styles.BtnDelivered}>
              <Text style={styles.btnText}>Diantar</Text>
            </View>
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

export default SectionPesanan;

const styles = StyleSheet.create({
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
});
