/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  authorizations: [],
  error: null,
  stat: null,
  statusText: null,
};

export const postAuthorization = createAsyncThunk(
  'authorizations/postAuthorization',
  async (dataForm, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch('https://strapi.cleverland.by/api/auth/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataForm),
      });

      if (response.statusText !== 'OK') {
        throw new Error(response.statusText);
      }

      const data = await response.json();

      return dispatch(setAuthorization(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const authorizationSlice = createSlice({
  name: 'authorizations',
  initialState,
  reducers: {
    setAuthorization: (state, action) => {
      state.authorizations = action.payload;
      localStorage.setItem('token', action.payload.jwt);
    },
  },
  extraReducers: {
    [postAuthorization.fulfilled.type]: (state) => {
      state.loading = false;
      state.stat = 'loading';
      state.error = null;
      state.statusText = null;
    },
    [postAuthorization.pending.type]: (state) => {
      state.loading = true;
      state.stat = 'resolved';
      state.error = null;
      state.statusText = 'OK';
    },
    [postAuthorization.rejected]: (state, action) => {
      state.stat = 'rejected';
      state.loading = false;
      state.error = action.payload;
      state.statusText = null;
    },
  },
});

export const { setAuthorization } = authorizationSlice.actions;
export default authorizationSlice.reducer;
