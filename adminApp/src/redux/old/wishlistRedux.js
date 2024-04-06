import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlists: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL WISHLISTS
    getWishlistStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getWishlistSuccess: (state, action) => {
      state.isFetching = false;
      state.wishlists = action.payload;
    },
    getWishlistFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE WISHLIST
    deleteWishlistStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteWishlistSuccess: (state, action) => {
      state.isFetching = false;
      state.wishlists.splice(
        state.wishlists.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteWishlistFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE WISHLIST
    updateWishlistStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateWishlistSuccess: (state, action) => {
      state.isFetching = false;
      state.wishlists[
        state.wishlists.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.wishlist;
    },
    updateWishlistFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD WISHLIST
    addWishlistStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addWishlistSuccess: (state, action) => {
      state.isFetching = false;
      state.wishlists.push(action.payload);
    },
    addWishlistFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { 
  getWishlistStart,
  getWishlistSuccess,
  getWishlistFailure,
  deleteWishlistStart,
  deleteWishlistSuccess,
  deleteWishlistFailure,
  updateWishlistStart,
  updateWishlistSuccess,
  updateWishlistFailure,
  addWishlistStart,
  addWishlistSuccess,
  addWishlistFailure,
} = orderSlice.actions;

export default orderSlice.reducer;