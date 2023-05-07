/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  passwords: [],
  success: false,
  error: null,
};

export const passwordSlice = createSlice({
  name: 'passwords',
  initialState,
  reducers: {
    setPassword: (state, action) => {
      state.passwords = action.payload;
      state.error = null;
      state.success = true;
    },
    setPasswordError(state, action) {
      state.error = 'error';
      state.success = false;
    },
    showLoading(state) {
      state.loading = true;
    },
    hiddenLoading(state) {
      state.loading = false;
    },
  },
});
export const { setPassword, setPasswordError, showLoading, hiddenLoading } = passwordSlice.actions;

export const postPassword = (data) => async (dispatch) => {
  dispatch(showLoading());

  try {
    await axios.post('https://library-cleverland-2jfze.ondigitalocean.app/api/auth/forgot-password', {
      email: data.email,
    });
    dispatch(setPassword());
  } catch (error) {
    dispatch(setPasswordError(error));
  }
  dispatch(hiddenLoading());
};
export default passwordSlice.reducer;
