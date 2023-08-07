import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  wishlistCounter: 0,
  cartCounter: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    wishlistLen: (state, action) => {
      state.wishlistCounter = action.payload;
      Cookies.set(
        "counter",
        JSON.stringify({
          wishlist: state.wishlistCounter,
          cart: state.cartCounter,
        }),
        { expires: 7 }
      );
    },
    cartLen: (state, action) => {
      state.cartCounter = action.payload;
      Cookies.set(
        "counter",
        JSON.stringify({
          wishlist: state.wishlistCounter,
          cart: state.cartCounter,
        }),
        { expires: 7 }
      );
    },
  },
});

const counterActions = counterSlice.actions;
const counterReducers = counterSlice.reducer;

export { counterActions, counterReducers };
