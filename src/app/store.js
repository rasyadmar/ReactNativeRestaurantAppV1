import {configureStore} from '@reduxjs/toolkit';
import keranjangReducer from '../features/keranjangSlice';
import statusPesanReducer from '../features/statusPesanSlice';

export default configureStore({
  reducer: {
    keranjang: keranjangReducer,
    statusPesan: statusPesanReducer,
  },
});
