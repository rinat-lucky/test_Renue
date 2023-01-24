import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: '',
  coins: [],
};

const refundSlice = createSlice({
  name: 'refund',
  initialState,
  reducers: {
    setCoins: (state, action) => {
      state.coins = action.payload;
    },
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setCoins, updateStatus } = refundSlice.actions;
export default refundSlice.reducer;
