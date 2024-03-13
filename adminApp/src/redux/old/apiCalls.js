
// THIS CODE SAVED FOR HISTORY

import { publicRequest, userRequest } from "../requestMethods";
import { 
  loginStart, loginSuccess, loginFailure,
  getUsersStart, getUsersSuccess, getUsersFailure,
  updateUsersStart, updateUsersSuccess, updateUsersFailure,
  addUsersStart, addUsersSuccess, addUsersFailure,
  deleteUsersStart, deleteUsersSuccess, deleteUsersFailure, 
  // logoutStart, logoutSuccess, logoutFailure,
 } from "./userRedux";
import { logoutStart, logoutSuccess, logoutFailure } from "./userSlice";
import {
  getProductStart, getProductSuccess, getProductFailure,
  deleteProductStart, deleteProductSuccess, deleteProductFailure,
  updateProductStart, updateProductSuccess, updateProductFailure,
  addProductStart, addProductSuccess, addProductFailure,
} from "./productRedux";
import {
  getWishlistStart, getWishlistSuccess, getWishlistFailure,
  deleteWishlistStart, deleteWishlistSuccess, deleteWishlistFailure,
  updateWishlistStart, updateWishlistSuccess, updateWishlistFailure,
  addWishlistStart, addWishlistSuccess, addWishlistFailure,
} from "./wishlistRedux";
import {
  getOrderStart, getOrderSuccess, getOrderFailure, 
  deleteOrderStart, deleteOrderSuccess, deleteOrderFailure,
  updateOrderStart, updateOrderSuccess, updateOrderFailure,
  addOrderStart, addOrderSuccess, addOrderFailure,
} from "./orderRedux";

// ---------------------- LOGIN -------------------------------------------
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/adminAuth", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure(error.response.data));
  }
};

//---------------------- LOGOUT -------------------------------------------
export const logout = async (dispatch, user) => {
  dispatch(logoutStart());
  try {
    const res = await userRequest.post(`/auth/logout/${user.id}`);
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailure());
  }
};

//---------------------- USERS ---------------------------------------------
export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await userRequest.get("/users");
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUsersStart());
  try {
    const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteUsersSuccess(id));
  } catch (err) {
    dispatch(deleteUsersFailure());
  }
};

export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUsersStart());
  try {
    const res = await userRequest.put(`/users/${id}`, user);
    dispatch(updateUsersSuccess(res.data));
  } catch (err) {
    dispatch(updateUsersFailure());
  }
};

export const addUser = async (user, dispatch) => {
  dispatch(addUsersStart());
  try {
    const res = await userRequest.post("/users", user);
    dispatch(addUsersSuccess(res.data));
  } catch (err) {
    dispatch(addUsersFailure());
  }
};

//---------------------- PRODUCTS -----------------------------------------
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await userRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess(res.data));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

//---------------------- WISHLISTS -----------------------------------------
export const getWishlists = async (dispatch) => {
  dispatch(getWishlistStart());
  try {
    const res = await userRequest.get("/wishlists");
    dispatch(getWishlistSuccess(res.data));
  } catch (err) {
    dispatch(getWishlistFailure());
  }
};

export const deleteWishlist = async (id, dispatch) => {
  dispatch(deleteWishlistStart());
  try {
    const res = await userRequest.delete(`/wishlists/${id}`);
    dispatch(deleteWishlistSuccess(id));
  } catch (err) {
    dispatch(deleteWishlistFailure());
  }
};

export const updateWishlist = async (id, wishlist, dispatch) => {
  dispatch(updateWishlistStart());
  try {
    const res = await userRequest.put(`/wishlists/${id}`, wishlist);
    dispatch(updateWishlistSuccess(res.data));
  } catch (err) {
    dispatch(updateWishlistFailure());
  }
};

export const addWishlist = async (wishlist, dispatch) => {
  dispatch(addWishlistStart());
  try {
    const res = await userRequest.post(`/wishlists`, wishlist);
    dispatch(addWishlistSuccess(res.data));
  } catch (err) {
    dispatch(addWishlistFailure());
  }
};

//---------------------- ORDERS -----------------------------------------
export const getOrders = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await userRequest.get("/orders");
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure());
  }
};