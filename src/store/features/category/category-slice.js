/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { httpService } from '../../../api/api';

const initialState = {
  loadingCategories: true,
  categories: [],
  error: null,
};

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.error = false;
      state.categories = action.payload;
      state.loadingCategories = false;
    },
    setError(state) {
      state.error = true;
      state.loadingCategories = false;
    },
    showLoading(state) {
      state.loadingCategories = true;
    },
    hiddenLoading(state) {
      state.loadingCategories = false;
    },
  },
});

export const { setCategories, setError, showLoading, hiddenLoading } = categorySlice.actions;
export const getCategories = () => async (dispatch) => {
  try {
    const resp = await httpService.get('/categories');

    dispatch(setCategories(resp.data));
  } catch (err) {
    dispatch(setError(err.data));
  }
};
export default categorySlice.reducer;
