import {configureStore} from '@reduxjs/toolkit';
import keranjangReducer from '../features/keranjangSlice';

export default configureStore({
  reducer: {
    keranjang: keranjangReducer,
  },
});
