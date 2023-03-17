import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {items: []},
  reducers: {
    addToCart: (state, action) => {
      const {id, title, price, image} = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({id, title, price, quantity: 1, image});
      }
    },
    removeFromCart: (state, action) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id,
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
        } else {
          const index = state.items.findIndex(
            item => item.id === action.payload.id,
          );
          state.items.splice(index, 1);
        }
      } else {
        state.items.push({id, title, price, quantity: 1, image});
      }
      // if (index !== -1) {
      // state.items.splice(index, 1);
      // }
    },
    clearCart: state => {
      state.items = [];
    },
  },
});

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;

export default cartSlice.reducer;
