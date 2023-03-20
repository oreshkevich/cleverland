/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { httpService } from '../../../api/api';

const initialState = {
  loading: false,
  bookings: [],
  error: false,
  success: false,
};

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload;
      localStorage.setItem('bookingsId', action.payload.id);
      state.error = false;
      state.success = true;
    },

    setBookingsError(state, action) {
      state.error = action.payload;
      state.success = false;
    },
    resetError(state) {
      state.success = false;
      state.error = false;
    },
    showLoading(state) {
      state.loading = true;
    },
    hiddenLoading(state) {
      state.loading = false;
    },
  },
});
export const { setBookings, setBookingsError, resetError, showLoading, hiddenLoading } = bookingsSlice.actions;

export const postBookings = (data) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const resp = await httpService.post('https://strapi.cleverland.by/api/bookings', { data });

    dispatch(setBookings(resp.data));
  } catch (err) {
    dispatch(setBookingsError(err));
  }
  dispatch(hiddenLoading());
};

export default bookingsSlice.reducer;
