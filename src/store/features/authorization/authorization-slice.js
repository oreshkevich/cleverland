/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  authorizations: [],
  error: null,
  stat: null,
  statusText: null,
  userIdAut: '',
  success: false,
};

export const authorizationSlice = createSlice({
  name: 'authorizations',
  initialState,
  reducers: {
    setAuthorization: (state, action) => {
      state.authorizations = action.payload;
      state.userIdAut = action.payload.user.id;
      localStorage.setItem('token', action.payload.jwt);
      localStorage.setItem('userId', action.payload.user.id);
      state.loading = false;
    },

    setAuthorizationError(state, action) {
      state.error = action.payload;
      state.success = false;
      state.loading = false;
    },
    showLoading(state) {
      state.loading = true;
    },
    hiddenLoading(state) {
      state.loading = false;
    },
  },
});

export const { setAuthorization, setAuthorizationError, showLoading, hiddenLoading } = authorizationSlice.actions;

export const postAuthorization = (data) => async (dispatch) => {
  dispatch(showLoading());

  try {
    const resp = await axios.post('https://library-cleverland-2jfze.ondigitalocean.app/api/auth/local', {
      identifier: data.identifier,
      password: data.password,
    });

    dispatch(setAuthorization(resp.data));
  } catch (error) {
    dispatch(setAuthorizationError(error.response.statusText));
  }
  dispatch(hiddenLoading());
};

export default authorizationSlice.reducer;
