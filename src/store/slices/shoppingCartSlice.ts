import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/productType';

interface CartProduct extends Product {
  quantity: number;
}

interface CartState {
  cartItems: CartProduct[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<Product>) => {
      const existingProduct = state.cartItems.find(item => item.id === action.payload.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    updateQuantity: (state: CartState, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.cartItems.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addToCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
