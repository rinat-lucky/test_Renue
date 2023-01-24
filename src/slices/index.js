import { configureStore } from '@reduxjs/toolkit';
import products from './productsSlice.js';
import shopList from './shopListSlice.js';
import balance from './balanceSlice.js';
import refund from './refundSlice.js';

export default configureStore({
  reducer: {
    products,
    shopList,
    balance,
    refund,
  },
});
