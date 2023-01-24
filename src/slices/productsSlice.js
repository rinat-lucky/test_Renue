import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.value = action.payload;
    },
    buyProduct: (state, action) => {
      const targetProduct = state.value.find((product) => product.id === action.payload.id);
      targetProduct.availableUnits -= 1;
    },
  },
});

export const { setProducts, buyProduct } = productsSlice.actions;
export default productsSlice.reducer;
