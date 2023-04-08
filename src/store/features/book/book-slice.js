/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

import { httpService } from '../../../api/api';

const initialState = {
  loadingBook: true,
  loading: false,
  books: [],
  error: null,
  status: null,
  reviews: [],
  errorReviews: false,
  successReviews: false,
};

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.error = false;
      state.books = action.payload;
    },
    setBookError(state) {
      state.error = true;
    },
    setReviews: (state, action) => {
      state.reviews = action.payload;
      state.errorReviews = false;
      state.successReviews = true;
    },

    setReviewsError(state, action) {
      state.errorReviews = action.payload;
      state.successReviews = false;
    },
    resetReviewsError(state) {
      state.successReviews = false;
      state.errorReviews = false;
    },
    showLoading(state) {
      state.loadingBook = true;
    },
    hiddenLoading(state) {
      state.loadingBook = false;
    },
    showLoad(state) {
      state.loading = true;
    },
    hiddenLoad(state) {
      state.loading = false;
    },
  },
});
export const {
  setBooks,
  setBookError,
  showLoading,
  hiddenLoading,
  resetReviewsError,
  resetLoading,
  setReviews,
  setReviewsError,
  showLoad,
  hiddenLoad,
} = bookSlice.actions;

export const getSearchId = (id) => async (dispatch) => {
  //   dispatch(showLoading());
  try {
    const resp = await httpService.get(`/books/${id}`);

    dispatch(setBooks(resp.data));
  } catch (err) {
    dispatch(setBookError(err.data));
  }
  dispatch(hiddenLoading());
};

export const postReviews = (data) => async (dispatch) => {
  dispatch(showLoad());
  try {
    const resp = await httpService.post('/comments', { data });

    dispatch(setReviews(resp.data));
  } catch (err) {
    dispatch(setReviewsError(err));
  }
  dispatch(hiddenLoad());
};

export default bookSlice.reducer;
