import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Rating, AirbnbRating} from 'react-native-ratings';

const itemReview = ({pereview, review, komentar}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerRating}>
        <Text style={styles.text}>{pereview}</Text>
        <AirbnbRating
          tintColor="white"
          count={5}
          showRating={false}
          defaultRating={review}
          isDisabled={true}
          size={hp('2%')}
        />
      </View>
      <View style={styles.komentar}>
        <Text style={styles.textKomentar}>{komentar}</Text>
      </View>
    </View>
  );
};

export default itemReview;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: hp('1%'),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  containerRating: {
    marginVertical: hp('1%'),
    marginHorizontal: hp('3%'),
    padding: hp('3%'),
    backgroundColor: '#e67e22',
    borderRadius: hp('1%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: hp('2%'),
    color: '#fff',
  },
  komentar: {
    margin: hp('1%'),
    width: wp('85%'),
    borderRadius: hp('2%'),
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    paddingVertical: hp('1%'),
    paddingHorizontal: hp('2%'),
  },
  textKomentar: {
    color: '#7f8c8d',
  },
});
