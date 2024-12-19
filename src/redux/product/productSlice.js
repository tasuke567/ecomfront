import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } = productSlice.actions;
export default productSlice.reducer;