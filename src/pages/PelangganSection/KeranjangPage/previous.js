import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

let Keranjang = [];

export const addToKeranjang = Tambahan => {
  var i;
  for (i = 0; i < Tambahan.length; i++) {
    Tambahan[i].id = Keranjang.length + i;
  }
  Keranjang.push(Tambahan);
};

export const removeFromKeranjang = Dihapus => {
  Keranjang = Keranjang.filter(function (obj) {
    return obj.pesanan !== Dihapus;
  });
};

export const addJumlahPesanan = yangDiAdd => {
  var i;
  for (i = 0; i < Keranjang.length; i++) {
    if (Keranjang[i].pesanan === yangDiAdd) {
      Keranjang.jumlah = Keranjang.jumlah + 1;
    }
  }
};

export const substractJumlahPesanan = yangDiSubstract => {
  var i;
  for (i = 0; i < Keranjang.length; i++) {
    if (Keranjang[i].pesanan === yangDiSubstract) {
      Keranjang.jumlah = Keranjang.jumlah + 1;
    }
  }
};

const Item = ({pesanan, jumlah}) => {
  return (
    <View>
      <Text>{pesanan}</Text>
      <Text>{jumlah}</Text>
    </View>
  );
};

const KeranjangPage = () => {
  const [keranjangBelanja, setkeranjang] = useState([]);

  React.useEffect(() => {
    console.log(setkeranjang(Keranjang));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Ini Isi Keranjang</Text>
      {/* <Button title="cekKeranjang" onPress={}>
        Cek Keranjang
      </Button> */}
      {keranjangBelanja.map(isi => {
        return (
          <Item
            key={isi[0].id}
            pesanan={isi[0].pesanan}
            jumlah={isi[0].jumlah}
          />
        );
      })}
    </View>
  );
};

export default KeranjangPage;

const styles = StyleSheet.create({
  container: {padding: 20},
});
