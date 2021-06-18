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
import firestore from '@react-native-firebase/firestore';

const RatingPage = () => {
  const [rating, setRating] = useState(1);
  const [reviewId, setReviewId] = useState([]);
  const [reviewList, setReviewList] = useState([]);

  const getDataFromFire = () => {
    let listGet = [];
    let idReview = [];
    firestore()
      .collection('review')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          listGet.push(documentSnapshot.data());
          idReview.push(documentSnapshot.id);
        });
        setReviewList(listGet);
        setReviewId(idReview);
        countRating(listGet);
      });
  };

  const countRating = listGet => {
    let rating = 0;
    listGet.map(item => {
      rating = rating + item.review;
    });
    setRating((rating / listGet.length).toFixed(1));
  };
  useEffect(() => {
    getDataFromFire();
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
        {reviewList.map((item, i) => {
          return (
            <ItemReview
              key={reviewId[i]}
              pereview={item.pemesan}
              review={item.review}
              komentar={item.komentar}
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
