/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  recoveryPassword: [],
  success: false,
  error: null,
  stat: null,
  statusText: null,
};

export const recoveryPasswordSlice = createSlice({
  name: 'recoveryPassword',
  initialState,
  reducers: {
    setRecoveryPassword: (state, action) => {
      state.recoveryPassword = action.payload;
      state.error = null;
      state.success = true;
    },
    setRecoveryPasswordError(state, action) {
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
export const { setRecoveryPassword, setRecoveryPasswordError, showLoading, hiddenLoading } =
  recoveryPasswordSlice.actions;

export const postRecoveryPassword = (data, code) => async (dispatch) => {
  dispatch(showLoading());
  try {
    await axios.post('https://strapi.cleverland.by/api/auth/reset-password', {
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
      code,
    });
    dispatch(setRecoveryPassword());
  } catch (error) {
    dispatch(setRecoveryPasswordError(error));
  }
  dispatch(hiddenLoading());
};

export default recoveryPasswordSlice.reducer;
