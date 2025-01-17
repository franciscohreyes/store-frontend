import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';

// Thunk para obtener productos por negocio
export const fetchProductsByBusiness = createAsyncThunk(
  'products/fetchProductsByBusiness',
  async (businessId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await API.get(`/products?businessId=${businessId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByBusiness.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByBusiness.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProductsByBusiness.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Error específico
      });
  },
});

export default productSlice.reducer;
