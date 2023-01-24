import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice.js';
import shopListReducer from './shopListSlice.js';

export default configureStore({
  reducer: {
    products: productsReducer,
    shopList: shopListReducer,
  },
});
