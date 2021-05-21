import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import header from '../../../assets/image/headerflip.jpeg';
import logo from '../../../assets/image/img_logo.jpeg';

const RatingPage = () => {
  const [rating, setRating] = useState(1);
  useEffect(() => {
    setRating(5);
  }, []);

  const ratingCompleted = rating => {
    setRating(rating);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.headerImage} source={header} />
        <Image style={styles.headerlogo} source={logo} />
      </View>
      <Text style={styles.title}>Rating Pengguna</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{rating}</Text>
        <AirbnbRating
          tintColor="white"
          count={5}
          showRating={false}
          defaultRating={rating}
          onFinishRating={ratingCompleted}
          size={hp('5%')}
        />
      </View>
      <ScrollView></ScrollView>
    </View>
  );
};

export default RatingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ratingContainer: {
    paddingVertical: hp('1%'),
    marginHorizontal: hp('2%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(127, 140, 141,0.2)',
  },
  ratingText: {
    fontSize: hp('8%'),
    color: '#f39c12',
    fontWeight: 'bold',
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
