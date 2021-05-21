import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  keranjangList: [],
};

const keranjangSlice = createSlice({
  name: 'keranjang',
  initialState,
  reducers: {
    addToKeranjang: (state, action) => {
      state.keranjangList.push(action.payload.data);
    },
    deleteFromKeranjang: (state, action) => {
      state.keranjangList = state.keranjangList.filter(obj => {
        return obj.nama !== action.payload;
      });
    },
    increaseItemQty: (state, action) => {
      state.keranjangList.map(item => {
        if (item.nama === action.payload.namaItem) {
          item.qty = action.payload.qty + 1;
        }
      });
    },
    decreaseItemQty: (state, action) => {
      state.keranjangList.map(item => {
        if (item.nama === action.payload.namaItem) {
          item.qty = action.payload.qty - 1;
        }
      });
    },
  },
});

export const {
  addToKeranjang,
  deleteFromKeranjang,
  increaseItemQty,
  decreaseItemQty,
} = keranjangSlice.actions;
export const selectKeranjang = state => state.keranjang.keranjangList;
export default keranjangSlice.reducer;
