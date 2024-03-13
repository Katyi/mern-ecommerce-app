import { createSlice } from '@reduxjs/toolkit';
import { usersApi } from './usersApi';

const initialState = {
  currentUser: null,
  currentUser: null,
  isFetching: false,
  error: false,
};

// Config slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    logoutSuccess: (state) => {
      state.isFetching = false;
      state.currentUser = null;
      state.error = false;
    },
    logoutFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(usersApi.endpoints.login.matchFulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  },
});

// Export actions
export const { logoutStart, logoutSuccess, logoutFailure } = userSlice.actions;

// Select state currentUser from slice
export const selectUser = (state) => state.user.currentUser;

// Export reducer
export default userSlice.reducer;