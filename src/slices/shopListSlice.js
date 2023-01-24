import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

const shopListSlice = createSlice({
  name: 'shopList',
  initialState,
  reducers: {
    addToShopList: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { addToShopList } = shopListSlice.actions;
export default shopListSlice.reducer;
