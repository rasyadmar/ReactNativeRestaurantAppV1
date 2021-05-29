import React from 'react';
import {StatusBar, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import MainPagePelanggan from './src/pages/PelangganSection/MainPage';
import KeranjangPagePelanggan from './src/pages/PelangganSection/KeranjangPage';
import QRScanPage from './src/pages/QRScanPage';
import MenuPagePelanggan from './src/pages/PelangganSection/MenuPage';
import MakananPagePelanggan from './src/pages/PelangganSection/MakananPage';
import MinumanPagePelanggan from './src/pages/PelangganSection/MinumanPage';
import MainPagePelayan from './src/pages/PelayanSection/MainPage';
import DaftarPesananPelayan from './src/pages/PelayanSection/DaftarPesananPage';
import UpdateStokPelayan from './src/pages/PelayanSection/UpdateStokPage';
import ChatPelangganPelayan from './src/pages/PelayanSection/ChatPelangganPage';
import DetailPelanggan from './src/pages/PelayanSection/DaftarPesananPage/detailPelanggan';
import RatingPage from './src/pages/ManagementSection/RatingPage';
import RekapitulasiMenuPage from './src/pages/ManagementSection/RekapitulasiMenuPage';
import RekapitulasiPembayaranPage from './src/pages/ManagementSection/RekapitulasiPembayaranPage';
import MainPageManagement from './src/pages/ManagementSection/MainPage';
import DetailRekapitulasiMenu from './src/pages/ManagementSection/RekapitulasiMenuPage/DetailRekapitulasi';
import DetailRekapitulasiBayar from './src/pages/ManagementSection/RekapitulasiPembayaranPage/DetailRekapitulasi';
import {Provider} from 'react-redux';
import store from './src/app/store';
import AppInside from './AppInside';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <AppInside />
    </Provider>
  );
};

export default App;
