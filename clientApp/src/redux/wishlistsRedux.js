import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlists: [],
    currentWishlist: null,
    quantity: 0,
    total: 0,
  },
  reducers: {
    // GET CURRENT WISHLIST
    getWishlistStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getWishlistSuccess: (state, action) => {
      state.isFetching = false;
      state.currentWishlist = action.payload;
    },
    getWishlistFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // ADD WISHLIST
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
    // UPDATE WISHLIST
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
  },
});

export const { 
  getWishlistStart,
  getWishlistSuccess,
  getWishlistFailure,
  addWishlistStart,
  addWishlistSuccess,
  addWishlistFailure,
  updateWishlistStart,
  updateWishlistSuccess,
  updateWishlistFailure,
  deleteWishlistStart,
  deleteWishlistSuccess,
  deleteWishlistFailure,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;