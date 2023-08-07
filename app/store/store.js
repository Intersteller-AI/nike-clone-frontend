import { configureStore } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { userReducers } from "./reducers/user";
import { productReducers } from "./reducers/product";
import { counterReducers } from "./reducers/counter";

const userInfoFromCookie = Cookies.get("user")
  ? JSON.parse(Cookies.get("user"))
  : null;
const productInfoFromCookie = Cookies.get("product")
  ? JSON.parse(Cookies.get("product"))
  : null;
const counterFromCookie = Cookies.get("counter")
  ? JSON.parse(Cookies.get("counter"))
  : null;

const initialState = {
  user: {
    userInfo: userInfoFromCookie,
  },
  product: {
    productInfo: productInfoFromCookie,
  },
  counter: {
    wishlistCounter: counterFromCookie?.wishlist,
    cartCounter: counterFromCookie?.cart
  },
};

export default configureStore({
  reducer: {
    user: userReducers,
    product: productReducers,
    counter: counterReducers,
  },
  preloadedState: initialState,
});
