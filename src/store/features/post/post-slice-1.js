/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  posts: [],
  error: null,
  stat: null,
};
const token = localStorage.getItem('token');

export const getPosts = createAsyncThunk('posts/getPosts', async (_, { rejectWithValue, dispatch }) => {
  try {
    const response = await fetch('https://strapi.cleverland.by/api/books', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.statusText !== 'OK') {
      throw new Error('Server Error!');
    }

    const data = await response.json();

    return dispatch(setPosts(data));
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
  extraReducers: {
    [getPosts.fulfilled.type]: (state) => {
      state.loading = false;
      state.stat = 'loading';
    },
    [getPosts.pending.type]: (state) => {
      state.loading = true;
      state.stat = 'resolved';
    },
    [getPosts.rejected]: (state, action) => {
      state.stat = 'rejected';
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setPosts } = postSlice.actions;
export default postSlice.reducer;
