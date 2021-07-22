import React, {useState, useEffect} from 'react';
import {TextInput, Alert} from 'react-native';
import {StyleSheet, ToastAndroid, Text, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import header from '../../../assets/image/headerflip.jpeg';
import logo from '../../../assets/image/img_logo.jpeg';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const GiveReviewPage = ({navigation}) => {
  const [rating, setRating] = React.useState(0);
  const [komentar, setKomentar] = React.useState('');
  const [namaPemesan, setNamaPemesan] = React.useState('');
  const [noMeja, setNoMeja] = React.useState('');

  const handleMassage = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('Status Pesanan Anda Telah DiPerbarui!');
    });

    return unsubscribe;
  };

  const submitReview = () => {
    if (rating === 0 || komentar === '') {
      ToastAndroid.show('Rating dan Komentar Harus Di Isi', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Terimakasih Sudah Memberi Review', ToastAndroid.SHORT);
      firestore()
        .collection('review')
        .where('pemesan', '==', namaPemesan)
        .get()
        .then(querySnapshot => {
          console.log(querySnapshot.size);
          if (querySnapshot.size === 0) {
            console.log('adding komentar');
            firestore()
              .collection('review')
              .add({
                pemesan: namaPemesan,
                review: rating,
                komentar: komentar,
              })
              .then(() => {
                console.log('Komentar added!');
              });
          } else {
            querySnapshot.forEach(documentSnapshot => {
              if (documentSnapshot.exists) {
                firestore()
                  .collection('review')
                  .doc(documentSnapshot.id)
                  .update({
                    review: rating,
                    komentar: komentar,
                  })
                  .then(() => {
                    console.log('Komentar updated!');
                  });
              }
            });
          }
          navigation.navigate('MenuPelanggan');
        });
    }
  };

  const ratingCompleted = rating => {
    setRating(rating);
  };

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let nama;
      let nomeja;
      try {
        nama = await AsyncStorage.getItem('namaPemesan');
        nomeja = await AsyncStorage.getItem('nomorMeja');
      } catch (e) {}
      setNamaPemesan(nama);
      setNoMeja(nomeja);
    };
    bootstrapAsync();
    handleMassage();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.headerImage} source={header} />
        <Image style={styles.headerlogo} source={logo} />
      </View>
      <Text style={styles.title}>Rating Pengguna</Text>
      <View style={styles.ratingContainer}>
        <AirbnbRating
          tintColor="white"
          count={5}
          showRating={false}
          defaultRating={0}
          isDisabled={false}
          size={hp('6%')}
          onFinishRating={ratingCompleted}
        />
      </View>
      <View style={styles.inputKomentar}>
        <TextInput
          style={styles.inputText}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          placeholder="Komentar..."
          placeholderTextColor="#7f8c8d"
          onChangeText={text => setKomentar(text)}
        />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          submitReview();
        }}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GiveReviewPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ratingContainer: {
    paddingVertical: hp('3%'),
    marginHorizontal: hp('2%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputKomentar: {
    margin: hp('2%'),
    width: wp('80%'),
    borderRadius: hp('2%'),
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    paddingVertical: hp('1%'),
    paddingHorizontal: hp('2%'),
  },
  inputText: {
    height: hp('20%'),
    color: '#7f8c8d',
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
  loginBtn: {
    width: wp('80%'),
    backgroundColor: '#f39c12',
    borderRadius: hp('4%'),
    height: hp('7%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('2'),
    marginBottom: hp('2%'),
    alignSelf: 'center',
  },
});
