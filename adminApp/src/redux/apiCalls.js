import { publicRequest, userRequest } from "../requestMethods";
import { 
  loginStart, loginSuccess, loginFailure,
  getUsersStart, getUsersSuccess, getUsersFailure,
  updateUsersStart, updateUsersSuccess, updateUsersFailure,
  addUsersStart, addUsersSuccess, addUsersFailure,
  deleteUsersStart, deleteUsersSuccess, deleteUsersFailure,
 } from "./userRedux";
import {
  getProductStart, getProductSuccess, getProductFailure,
  deleteProductStart, deleteProductSuccess, deleteProductFailure,
  updateProductStart, updateProductSuccess, updateProductFailure,
  addProductStart, addProductSuccess, addProductFailure,
} from "./productRedux";

// ---------------------- LOGIN -------------------------------------------
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

//---------------------- USER --------------------------------------------
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
    const res = await publicRequest.get("/products");
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