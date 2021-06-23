import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const itemChatInside = ({text, pengirim, date, time}) => {
  return (
    <View>
      {pengirim === 'pelayan' && (
        <View style={styles.pelayanOrientation}>
          <View>
            <Text style={styles.chatPelayan}>{text}</Text>
            <Text style={styles.waktu}>
              {date} {time}
            </Text>
          </View>
        </View>
      )}
      {pengirim === 'pelanggan' && (
        <View style={styles.pelangganOrientation}>
          <View>
            <Text style={styles.chatPelanggan}>{text}</Text>
            <Text style={styles.waktuPelanggan}>
              {date} {time}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default itemChatInside;

const styles = StyleSheet.create({
  pelangganOrientation: {
    flexDirection: 'row',
    margin: hp('1%'),
    justifyContent: 'flex-end',
  },
  pelayanOrientation: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  chatPelanggan: {
    maxWidth: wp('80%'),
    backgroundColor: '#ecf0f1',
    color: '#7f8c8d',
    padding: hp('1.5%'),
    borderRadius: hp('4%'),
  },
  chatPelayan: {
    maxWidth: wp('80%'),
    backgroundColor: '#f39c12',
    color: 'white',
    padding: hp('1.5%'),
    borderRadius: hp('4%'),
  },
  waktuPelanggan: {
    alignSelf: 'flex-end',
    color: '#7f8c8d',
    fontSize: hp('1.4%'),
    marginEnd: wp('1.5%'),
  },
  waktu: {
    alignSelf: 'flex-start',
    color: '#7f8c8d',
    fontSize: hp('1.4%'),
    marginStart: wp('1.5%'),
  },
});
