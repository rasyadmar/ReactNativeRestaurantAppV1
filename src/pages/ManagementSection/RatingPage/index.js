import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import header from '../../../assets/image/headerflip.jpeg';
import logo from '../../../assets/image/img_logo.jpeg';
import ItemReview from './itemReview';

let dummyReview = [
  {id: 1, pereview: 'budi', review: 1},
  {id: 2, pereview: 'maman', review: 2},
  {id: 3, pereview: 'memet', review: 1},
  {id: 4, pereview: 'amir', review: 5},
  {id: 5, pereview: 'samir', review: 2},
  {id: 6, pereview: 'lail', review: 5},
  {id: 7, pereview: 'jono', review: 5},
];

const RatingPage = () => {
  const [rating, setRating] = useState(1);
  const [dummy, setDummy] = useState([]);
  const countRating = () => {
    let dumRating = 0;
    dummy.map(item => {
      dumRating = dumRating + item.review;
    });
    setRating((dumRating / dummy.length).toFixed(1));
  };
  useEffect(() => {
    countRating();
    setDummy(dummyReview);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Rating
          tintColor="white"
          ratingCount={6}
          showRating={false}
          startingValue={rating}
          onFinishRating={ratingCompleted}
          readonly={true}
          size={hp('5%')}
        />
      </View>
      <ScrollView>
        {dummy.map(item => {
          return (
            <ItemReview
              key={item.id}
              pereview={item.pereview}
              review={item.review}
            />
          );
        })}
      </ScrollView>
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
