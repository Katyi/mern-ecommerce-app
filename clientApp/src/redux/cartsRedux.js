import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    currentCart: null,
    quantity: 0,
    total: 0,
  },
  reducers: {
    // GET CURRENT CART 
    getCartStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCartSuccess: (state, action) => {
      state.isFetching = false;
      state.currentCart = action.payload;
    },
    getCartFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // UPDATE CART
    updateCartStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateCartSuccess: (state, action) => {
      state.isFetching = false;
      state.carts[
        state.carts.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.cart;
    },
    updateCartFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // ADD CART
    addCartStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addCartSuccess: (state, action) => {
      state.isFetching = false;
      state.carts.push(action.payload);
    },
    addCartFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE CART
    deleteCartStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteCartSuccess: (state, action) => {
      state.isFetching = false;
      state.carts.splice(
        state.carts.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteCartFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { 
  getCartStart,
  getCartSuccess,
  getCartFailure,
  updateCartStart,
  updateCartSuccess,
  updateCartFailure,
  addCartStart,
  addCartSuccess,
  addCartFailure,
  deleteCartStart,
  deleteCartSuccess,
  deleteCartFailure,
} = cartSlice.actions;
export default cartSlice.reducer;