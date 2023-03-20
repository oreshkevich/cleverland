/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { httpService } from '../../../api/api';

const initialState = {
  loadingReviews: false,
  reviews: [],
  errorReviews: false,
  successReviews: false,
};

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
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
      state.loadingReviews = true;
    },
    hiddenLoading(state) {
      state.loadingReviews = false;
    },
  },
});
export const { setReviews, setReviewsError, resetReviewsError, showLoading, hiddenLoading } = reviewsSlice.actions;

export const postReviews = (data) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const resp = await httpService.post('https://strapi.cleverland.by/api/comments', { data });

    dispatch(setReviews(resp.data));
  } catch (err) {
    dispatch(setReviewsError(err));
  }
  dispatch(hiddenLoading());
};

export default reviewsSlice.reducer;
