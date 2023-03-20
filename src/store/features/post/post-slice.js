/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { httpService } from '../../../api/api';

const initialState = {
  posts: [],
  isErrorBook: null,
  isLoadingBook: true,
  loading: false,
  bookings: [],
  error: false,
  successPost: false,
  bookingsChange: [],
  errorChange: false,
  successChange: false,
  bookingsDelete: [],
  errorDelete: false,
  successDelete: false,
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.isErrorBook = false;
      state.posts = action.payload;
      state.successPost = true;
    },
    setError(state) {
      state.isErrorBook = true;
      state.successPost = false;
    },
    setBookings: (state, action) => {
      state.bookings = action.payload;
      localStorage.setItem('bookingsId', action.payload.id);
      state.error = false;
      state.success = true;
      state.successPost = false;
    },

    setBookingsError(state, action) {
      state.error = action.payload;
      state.success = false;
      state.successPost = false;
    },

    setBookingsChange: (state, action) => {
      state.bookingsChange = action.payload;
      state.errorChange = false;
      state.successChange = true;
      state.successPost = false;
    },

    setBookingsChangeError(state, action) {
      state.errorChange = action.payload;
      state.successChange = false;
      state.successPost = false;
    },
    setBookingsDelete: (state, action) => {
      state.bookingsDelete = action.payload;
      state.errorDelete = false;
      state.successDelete = true;
      state.successPost = false;
    },

    setBookingsDeleteError(state, action) {
      state.errorDelete = action.payload;
      state.successDelete = false;
      state.successPost = false;
    },
    resetError(state) {
      state.success = false;
      state.error = false;
      state.successChange = false;
      state.errorChange = false;
      state.successDelete = false;
      state.errorDelete = false;
      state.successPost = false;
    },
    showLoading(state) {
      state.isLoadingBook = true;
    },
    hiddenLoading(state) {
      state.isLoadingBook = false;
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
  setPosts,
  setError,
  showLoading,
  hiddenLoading,
  setBookings,
  setBookingsError,
  showLoad,
  hiddenLoad,
  resetError,
  setBookingsChange,
  setBookingsChangeError,
  resetBookingError,
  setBookingsDelete,
  setBookingsDeleteError,
} = postSlice.actions;
export const booksReducer = postSlice.reducer;

export const getPosts = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const resp = await httpService.get('/books');

    dispatch(setPosts(resp.data));
  } catch (err) {
    dispatch(setError(err.data));
  }
  dispatch(hiddenLoading());
};
export const postBookings = (data) => async (dispatch) => {
  dispatch(showLoad());
  try {
    const resp = await httpService.post('https://strapi.cleverland.by/api/bookings', { data });

    dispatch(setBookings(resp.data));
  } catch (err) {
    dispatch(setBookingsError(err));
  }
  dispatch(hiddenLoad());
};
export const putBookingsChange = (data, bookingId) => async (dispatch) => {
  dispatch(showLoad());
  try {
    const resp = await httpService.put(`https://strapi.cleverland.by/api/bookings/${bookingId}`, { data });

    dispatch(setBookingsChange(resp.data));
  } catch (err) {
    dispatch(setBookingsChangeError(err));
  }
  dispatch(hiddenLoad());
};
export const deleteBookings = (bookingId) => async (dispatch) => {
  dispatch(showLoad());
  try {
    const resp = await httpService.delete(`https://strapi.cleverland.by/api/bookings/${bookingId}`);

    dispatch(setBookingsDelete(resp.data));
  } catch (err) {
    dispatch(setBookingsDeleteError(err));
  }
  dispatch(hiddenLoad());
};

export default postSlice.reducer;
