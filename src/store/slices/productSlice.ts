import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../types/productType';

interface ProductsState {
    product: Product;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ProductsState = {
    product: {
        id: 0,
        title: '',
        description: '',
        category: '',
        price: 0,
        discountPercentage: 0,
        dimensions: {
            width: 0,
            height: 0,
            depth: 0,
        },
        weight: 0,
        images: [],
        stock: 0,
        rating: undefined, 
        reviews: [],
        quantity: 0,
        isFavorite: false,
    },
    status: 'idle',
    error: null,
};

export const fetchProducts = createAsyncThunk<Product, number>(
    'products/fetchProduct',
    async (id: number) => {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        return data;
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.product = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to load product'; 
            });
    },
});

export default productSlice.reducer;
