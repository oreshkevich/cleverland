/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { httpService } from '../../../api/api';

const initialState = {
  loadingDelete: false,
  bookingsDelete: [],
  errorDelete: false,
  successDelete: false,
};

export const bookingsDeleteSlice = createSlice({
  name: 'bookingsDelete',
  initialState,
  reducers: {
    setBookingsDelete: (state, action) => {
      state.bookingsDelete = action.payload;
      state.errorDelete = false;
      state.successDelete = true;
    },

    setBookingsDeleteError(state, action) {
      state.errorDelete = action.payload;
      state.successDelete = false;
    },
    resetBookingsDeleteError(state) {
      state.successDelete = false;
      state.errorDelete = false;
    },
    showLoading(state) {
      state.loadingDelete = true;
    },
    hiddenLoading(state) {
      state.loadingDelete = false;
    },
  },
});
export const { setBookingsDelete, setBookingsDeleteError, resetBookingsDeleteError, showLoading, hiddenLoading } =
  bookingsDeleteSlice.actions;

export const deleteBookings = (bookingId) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const resp = await httpService.delete(`https://strapi.cleverland.by/api/bookings/${bookingId}`);

    dispatch(setBookingsDelete(resp.data));
  } catch (err) {
    dispatch(setBookingsDeleteError(err));
  }
  dispatch(hiddenLoading());
};

export default bookingsDeleteSlice.reducer;
