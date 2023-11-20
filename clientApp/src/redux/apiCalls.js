import { loginFailure, loginStart, loginSuccess, registerStart, registerSuccess, registerFailure } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import { 
  updateCartStart, updateCartSuccess, updateCartFailure, 
  getCartStart, getCartSuccess, getCartFailure, 
  addCartStart, addCartSuccess, addCartFailure,
  deleteCartStart, deleteCartSuccess, deleteCartFailure
} from './cartsRedux';
import { getOrderFailure, getOrderStart, getOrderSuccess } from "./ordersRedux";

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

// ---------------------- REGISTER ----------------------------------------
export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(registerFailure());
  }
};

//---------------------- CART ---------------------------------------------
export const getCart = async (userId, dispatch) => {
  dispatch(getCartStart());
  try {
    const res = await userRequest.get('/carts/find/' + userId);
    dispatch(getCartSuccess(res.data));
  } catch (err) {
    dispatch(getCartFailure());
  }
};

export const updateCart = async (userId, cart, dispatch) => {
  dispatch(updateCartStart());
  try {
    const res = await userRequest.put(`carts/${userId}`, cart);
    dispatch(updateCartSuccess(res.data));
  } catch (err) {
    dispatch(updateCartFailure());
  }
};

export const addCart = async (cart, dispatch) => {
  dispatch(addCartStart());
  try {
    const res = await userRequest.post("/carts", cart);
    dispatch(addCartSuccess(res.data));
  } catch (err) {
    dispatch(addCartFailure());
  }
};

export const deleteCart = async (id, dispatch) => {
  dispatch(deleteCartStart());
  try {
    const res = await userRequest.delete(`/carts/${id}`);
    dispatch(deleteCartSuccess(id));
  } catch (err) {
    dispatch(deleteCartFailure());
  }
};

//---------------------- ORDER ---------------------------------------------
export const getOrder = async (userId, dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await userRequest.get('/orders/find/' + userId);
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure());
  }
};
