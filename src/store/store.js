/* eslint-disable import/no-named-as-default */
import { configureStore } from '@reduxjs/toolkit';

import authorizationSlice from './features/authorization/authorization-slice';
import bookSlice from './features/book/book-slice';
import bookingsSlice from './features/bookings/bookings-slice';
import bookingsChangeSlice from './features/bookings-change/bookings-change-slice';
import bookingsDeleteSlice from './features/bookings-delete/bookings-delete-slice';
import categorySlice from './features/category/category-slice';
import passwordSlice from './features/password/password-slice';
import postSlice from './features/post/post-slice';
import recoveryPasswordSlice from './features/recovery-password/recovery-password-slice';
import registrationSlice from './features/registration/registration-slice';
import reviewsSlice from './features/reviews/reviews-slice';

export const store = configureStore({
  reducer: {
    post: postSlice,
    book: bookSlice,
    category: categorySlice,
    registration: registrationSlice,
    authorization: authorizationSlice,
    password: passwordSlice,
    recovery: recoveryPasswordSlice,
    reviews: reviewsSlice,
    bookings: bookingsSlice,
    bookingsChange: bookingsChangeSlice,
    bookingsDelete: bookingsDeleteSlice,
  },
});
