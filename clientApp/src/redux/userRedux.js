import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    // LOGIN
    loginStart: (state) => {
      state.isFetching = true;
      // state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // REGISTER
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    registerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // LOGOUT
    logoutStart: (state) => {
      state.isFetching = true;
      // state.error = false;
    },
    logoutSuccess: (state) => {
      state.isFetching = false;
      state.currentUser = null;
      // state.error = false;
    },
    logoutFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // UPDATE USER
    updateUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users[
        state.users.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.user;
    },
    updateUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // GET CURRENT USER
    getUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUserSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    getUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  getUserStart,
  getUserSuccess,
  getUserFailure,
} = userSlice.actions;
export default userSlice.reducer;