/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  loadingCategories: true,
  categories: [],
  error: null,
  statusCategories: null,
};
const token = localStorage.getItem('token');

export const getCategories = createAsyncThunk('categories/getCategories', async (id, { rejectWithValue, dispatch }) => {
  try {
    const response = await fetch('https://strapi.cleverland.by/api/categories', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.statusText !== 'OK') {
      throw new Error('Server Error!');
    }

    const data = await response.json();

    return dispatch(setCategories(data));
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers: {
    [getCategories.fulfilled]: (state) => {
      state.loadingCategories = false;
      state.status = 'loading';
    },
    [getCategories.pending]: (state) => {
      state.loadingCategories = true;
      state.status = 'resolved';
    },
    [getCategories.rejected]: (state, action) => {
      state.status = 'rejected';
      state.loadingCategories = false;
      state.error = action.payload;
    },
  },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
