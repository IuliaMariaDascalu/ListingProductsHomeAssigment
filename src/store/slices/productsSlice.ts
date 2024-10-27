import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ProductsList } from '../../types/productType';

interface ProductsState {
    products: ProductsList;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }

const initialState: ProductsState = {
    products: {
        products: [],
        total: 0
    },
    status: 'idle',
    error: null,
  }

  export const fetchProducts = createAsyncThunk<ProductsList, void>('products/fetchProducts', async () => {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    return data;
  });

  const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProducts.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.products = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || 'Failed to load products';
        });
    },
  });
  
  export default productsSlice.reducer;