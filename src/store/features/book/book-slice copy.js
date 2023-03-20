/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  loadingBook: true,
  books: [],
  error: null,
  status: null,
};

const token = localStorage.getItem('token');

export const getSearchId = createAsyncThunk('books/getSearchId', async (id, { rejectWithValue, dispatch }) => {
  try {
    const response = await fetch(`https://strapi.cleverland.by/api/books/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.statusText !== 'OK') {
      throw new Error('Server Error!');
    }

    const data = await response.json();

    return dispatch(setBooks(data));
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
  },
  extraReducers: {
    [getSearchId.fulfilled]: (state) => {
      state.loadingBook = false;
      state.status = 'loading';
    },
    [getSearchId.pending]: (state) => {
      state.loadingBook = true;
      state.status = 'resolved';
    },
    [getSearchId.rejected]: (state, action) => {
      state.status = 'rejected';
      state.loadingBook = false;
      state.error = action.payload;
    },
  },
});

export const { setBooks } = bookSlice.actions;
export default bookSlice.reducer;
