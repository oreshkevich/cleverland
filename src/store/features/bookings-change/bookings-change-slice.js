/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { httpService } from '../../../api/api';

const initialState = {
  loading: false,
  bookingsChange: [],
  errorChange: false,
  successChange: false,
};

export const bookingsChangeSlice = createSlice({
  name: 'bookingsChange',
  initialState,
  reducers: {
    setBookingsChange: (state, action) => {
      state.bookingsChange = action.payload;
      state.errorChange = false;
      state.successChange = true;
    },

    setBookingsChangeError(state, action) {
      state.errorChange = action.payload;
      state.successChange = false;
    },
    resetBookingError(state) {
      state.successChange = false;
      state.errorChange = false;
    },
    showLoading(state) {
      state.loading = true;
    },
    hiddenLoading(state) {
      state.loading = false;
    },
  },
});
export const { setBookingsChange, setBookingsChangeError, resetBookingError, showLoading, hiddenLoading } =
  bookingsChangeSlice.actions;

export const putBookingsChange = (data, bookingId) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const resp = await httpService.put(`https://strapi.cleverland.by/api/bookings/${bookingId}`, { data });

    dispatch(setBookingsChange(resp.data));
  } catch (err) {
    dispatch(setBookingsChangeError(err));
  }
  dispatch(hiddenLoading());
};

export default bookingsChangeSlice.reducer;
