import React from 'react';
import {StatusBar, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import MainPagePelanggan from './src/pages/PelangganSection/MainPage';
import KeranjangPagePelanggan from './src/pages/PelangganSection/KeranjangPage';
import QRScanPage from './src/pages/PelangganSection/QRScanPage';
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
import {Provider} from 'react-redux';
import store from './src/app/store';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {/* <Stack.Screen name="QRscanner" component={QRScanPage} /> */}

          {/* Halaman Pelanggan */}
          {/* <Stack.Screen
            name="MainPelanggan"
            component={Mainp=PagePelanggan}
            initialParams={{
              restoranCode: 'Scan QR Untuk Kode Restoran',
            }}
          />
          <Stack.Screen name="KeranjangPelanggan" component={KeranjangPagePelanggan} />
          <Stack.Screen name="MenuPelanggan" component={MenuPagePelanggan} />
          <Stack.Screen name="MakananPelanggan" component={MakananPagePelanggan} />
          <Stack.Screen name="MinumanPelanggan" component={MinumanPagePelanggan} /> */}

          {/* Halaman Pelanyan */}
          {/* <Stack.Screen name="MainPelayan" component={MainPagePelayan} />
          <Stack.Screen
            name="DaftarPesananPelayan"
            component={DaftarPesananPelayan}
          />
          <Stack.Screen
            name="UpdateStokPelayan"
            component={UpdateStokPelayan}
          />
          <Stack.Screen
            name="ChatPelangganPelayan"
            component={ChatPelangganPelayan}
          />
          <Stack.Screen
            name="DetailPelanggan"
            component={DetailPelanggan}
            initialParams={{
              namaPelanggan: 'Blum Masok',
            }}
          /> */}

          {/* Halaman Management */}
          <Stack.Screen
            name="MainPageManagement"
            component={MainPageManagement}
          />
          <Stack.Screen name="RatingPage" component={RatingPage} />
          <Stack.Screen
            name="RekapitulasiMenuPage"
            component={RekapitulasiMenuPage}
          />
          <Stack.Screen
            name="RekapitulasiPembayaranPage"
            component={RekapitulasiPembayaranPage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
