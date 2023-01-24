import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    setBalance: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setBalance } = balanceSlice.actions;
export default balanceSlice.reducer;
