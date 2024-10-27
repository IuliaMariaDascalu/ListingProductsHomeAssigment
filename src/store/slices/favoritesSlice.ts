import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/productType';

interface FavoritesState {
  favoriteProducts: Product[];
}

const initialState: FavoritesState = {
  favoriteProducts: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Product>) => {
      const existingIndex = state.favoriteProducts.findIndex(p => p.id === action.payload.id);
      if (existingIndex >= 0) {
        state.favoriteProducts.splice(existingIndex, 1);
      } else {
        state.favoriteProducts.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
