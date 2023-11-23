import { loginFailure, loginStart, loginSuccess, registerStart, registerSuccess, registerFailure } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import { 
  updateCartStart, updateCartSuccess, updateCartFailure, 
  getCartStart, getCartSuccess, getCartFailure, 
  addCartStart, addCartSuccess, addCartFailure,
  deleteCartStart, deleteCartSuccess, deleteCartFailure
} from './cartsRedux';
import { getOrderFailure, getOrderStart, getOrderSuccess } from "./ordersRedux";
import { 
  addWishlistFailure, addWishlistStart, addWishlistSuccess, 
  deleteWishlistFailure, deleteWishlistStart, deleteWishlistSuccess, 
  getWishlistFailure, getWishlistStart, getWishlistSuccess, 
  updateWishlistFailure, updateWishlistStart, updateWishlistSuccess
} from "./wishlistsRedux";

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

//---------------------- WISHLIST ------------------------------------------
export const getWishlist = async (userId, dispatch) => {
  dispatch(getWishlistStart());
  try {
    const res = await userRequest.get('/wishlists/find/' + userId);
    dispatch(getWishlistSuccess(res.data));
  } catch (err) {
    dispatch(getWishlistFailure());
  }
};

export const updateWishlist = async (userId, wishlist, dispatch) => {
  dispatch(updateWishlistStart());
  try {
    const res = await userRequest.put(`wishlists/${userId}`, wishlist);
    dispatch(updateWishlistSuccess(res.data));
  } catch (err) {
    dispatch(updateWishlistFailure());
  }
};

export const addWishlist = async (wishlist, dispatch) => {
  dispatch(addWishlistStart());
  try {
    const res = await userRequest.post("/wishlists", wishlist);
    dispatch(addWishlistSuccess(res.data));
  } catch (err) {
    dispatch(addWishlistFailure());
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