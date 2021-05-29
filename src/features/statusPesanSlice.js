import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: false,
};

const statusPesanSlice = createSlice({
  name: 'statusPesan',
  initialState,
  reducers: {
    changeStatus: (state, action) => {
      state.keranjangList = action.payload.data;
    },
  },
});

export const {changeStatus} = statusPesanSlice.actions;
export const selectPesanStatus = state => state.statusPesan.status;
export default statusPesanSlice.reducer;
