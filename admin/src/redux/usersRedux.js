import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getUsersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    getUsersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    // deleteProductStart: (state) => {
    //   state.isFetching = true;
    //   state.error = false;
    // },
    // deleteProductSuccess: (state, action) => {
    //   state.isFetching = false;
    //   state.products.splice(
    //     state.products.findIndex((item) => item._id === action.payload),
    //     1
    //   );
    // },
    // deleteProductFailure: (state) => {
    //   state.isFetching = false;
    //   state.error = true;
    // },
    //UPDATE
    // updateProductStart: (state) => {
    //   state.isFetching = true;
    //   state.error = false;
    // },
    // updateProductSuccess: (state, action) => {
    //   state.isFetching = false;
    //   state.products[
    //     state.products.findIndex((item) => item._id === action.payload.id)
    //   ] = action.payload.product;
    // },
    // updateProductFailure: (state) => {
    //   state.isFetching = false;
    //   state.error = true;
    // },
    //ADD
    // addProductStart: (state) => {
    //   state.isFetching = true;
    //   state.error = false;
    // },
    // addProductSuccess: (state, action) => {
    //   state.isFetching = false;
    //   state.products.push(action.payload);
    // },
    // addProductFailure: (state) => {
    //   state.isFetching = false;
    //   state.error = true;
    // },
  },
});

export const { 
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  // deleteProductStart,
  // deleteProductSuccess,
  // deleteProductFailure,
  // updateProductStart,
  // updateProductSuccess,
  // updateProductFailure,
  // addProductStart,
  // addProductSuccess,
  // addProductFailure,
} = usersSlice.actions;

export default usersSlice.reducer;