
import { publicRequest, userRequest } from "../requestMethods";
import { logoutStart, logoutSuccess, logoutFailure } from "./userSlice";
import {
  getWishlistStart, getWishlistSuccess, getWishlistFailure,
  deleteWishlistStart, deleteWishlistSuccess, deleteWishlistFailure,
  updateWishlistStart, updateWishlistSuccess, updateWishlistFailure,
  addWishlistStart, addWishlistSuccess, addWishlistFailure,
} from "./wishlistRedux";

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