import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useContext, useMemo, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import {AuthContext} from './utils/authContext';
import {reducer, initialState} from './reducer';
import {stateConditionString} from './utils/helpers';

const Stack = createStackNavigator();

const AppInside = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {}

      dispatch({type: 'RESTORE_TOKEN'});
    };
    bootstrapAsync();
    console.log(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authContextValue = useMemo(
    () => ({
      toPelanggan: async data => {
        dispatch({type: 'TO_PELANGGAN'});
      },
      toPelayan: async data => {
        dispatch({type: 'TO_PELAYAN'});
      },
      toManagement: async data => {
        dispatch({type: 'TO_MANAGEMENT'});
      },
      toQrScan: async data => {
        dispatch({type: 'TO_QRSCAN'});
      },
    }),
    [],
  );

  const chooseScreen = state => {
    let le = '';
    if (state.toQrScan) {
      le = 'LOGOUT';
    }
    if (state.toPelanggan) {
      le = 'PELANGGAN';
    }
    if (state.toPeyalan) {
      le = 'PELAYAN';
    }
    if (state.toManagement) {
      le = 'MANAGEMENT';
    }
    let arr = [];

    switch (le) {
      case 'PELANGGAN':
        arr.push(
          <>
            <Stack.Screen
              name="MainPelanggan"
              component={MainPagePelanggan}
              initialParams={{
                restoranCode: 'Scan QR Untuk Kode Restoran',
              }}
            />
            <Stack.Screen
              name="KeranjangPelanggan"
              component={KeranjangPagePelanggan}
            />
            <Stack.Screen name="MenuPelanggan" component={MenuPagePelanggan} />
            <Stack.Screen
              name="MakananPelanggan"
              component={MakananPagePelanggan}
            />
            <Stack.Screen
              name="MinumanPelanggan"
              component={MinumanPagePelanggan}
            />
          </>,
        );
        break;

      case 'PELAYAN':
        arr.push(
          <>
            <Stack.Screen name="MainPelayan" component={MainPagePelayan} />
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
                namaPelanggan: 'none',
              }}
            />
          </>,
        );
        break;
      case 'MANAGEMENT':
        arr.push(
          <>
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
            <Stack.Screen
              name="DetailRekapitulasiMenu"
              component={DetailRekapitulasiMenu}
              initialParams={{
                bulan: 'none',
              }}
            />
            <Stack.Screen
              name="DetailRekapitulasiBayar"
              component={DetailRekapitulasiBayar}
              initialParams={{
                bulan: 'none',
              }}
            />
          </>,
        );
        break;

      case 'LOGOUT':
        arr.push(<Stack.Screen name="QRscanner" component={QRScanPage} />);
        break;
    }
    console.log(le);
    return arr[0];
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {chooseScreen(state)}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default AppInside;
