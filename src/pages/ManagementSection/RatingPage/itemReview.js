import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Rating, AirbnbRating} from 'react-native-ratings';

const itemReview = ({pereview, review}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{pereview}</Text>
      <AirbnbRating
        tintColor="white"
        count={6}
        showRating={false}
        defaultRating={review}
        isDisabled={true}
        size={hp('2%')}
      />
    </View>
  );
};

export default itemReview;

const styles = StyleSheet.create({
  container: {
    marginVertical: hp('1%'),
    marginHorizontal: hp('3%'),
    padding: hp('3%'),
    backgroundColor: '#34495e',
    borderRadius: hp('1%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: hp('2%'),
    color: '#fff',
  },
});
