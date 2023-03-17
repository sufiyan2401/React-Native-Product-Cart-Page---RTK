import {configureStore} from '@reduxjs/toolkit';
import productsReducer from './productSlice';
import cartReducer from './cartSlice';
// import productsReducer  from './slices/productSlice';
// import cartReducer from './slices/cartSlice'
// import {productsReducer} from './slices/productSlice';
// import {cartReducer} from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});
