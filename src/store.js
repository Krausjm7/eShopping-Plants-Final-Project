import { configureStore } from '@reduxjs/toolkit'; // Imports configureStore
import cartReducer from './CartSlice';            // Imports cartReducer

const store = configureStore({ // Uses configureStore
  reducer: {
    cart: cartReducer,       // Assigns cartReducer to the 'cart' slice
  },
});

export default store;       // Exports the store