import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    currentOrder: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    // GET CURRENT ORDER 
    getOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.currentCart = action.payload;
    },
    getOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { 
  getOrderStart,
  getOrderSuccess,
  getOrderFailure,
} = orderSlice.actions;
export default orderSlice.reducer;