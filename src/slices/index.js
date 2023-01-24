import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice.js';

export default configureStore({
  reducer: {
    products: productsReducer,
  },
});
