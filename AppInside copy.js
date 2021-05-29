import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
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
// import AuthContext from './AuthContext';

const Stack = createStackNavigator();
const AuthContext = React.createContext();

const AppInside = ({navigation}) => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SETKEY':
          return {
            ...prevState,
            userToken: action.token,
          };
        case 'SIGNOUT':
          return {
            ...prevState,
            userToken: '',
          };
      }
    },
    {
      userToken: '',
    },
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {}

      dispatch({type: 'SETKEY', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      pelayan: async data => {
        dispatch({type: 'SETKEY', token: 'nariwipelayan'});
      },
      signOut: () => dispatch({type: 'SIGNOUT'}),
      pelanggan: async data => {
        dispatch({type: 'SETKEY', token: 'nariwipelanggan'});
      },
      management: async data => {
        dispatch({type: 'SETKEY', token: 'nariwimanagement'});
      },
    }),
    [],
  );
  const men = '';
  return (
    <AuthContext.Provider value={authContext}>
      {state.userToken === '' && (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="QRscanner" component={QRScanPage} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
      {state.userToken === 'nariwipelanggan' && (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
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
          </Stack.Navigator>
        </NavigationContainer>
      )}
      {state.userToken === 'nariwipelayan' && (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
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
          </Stack.Navigator>
        </NavigationContainer>
      )}
      {state.userToken === 'nariwimanagement' && (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
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
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </AuthContext.Provider>
  );
};

export default AppInside;
