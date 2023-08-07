import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const userInitialState = {
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      Cookies.set("user", JSON.stringify(action.payload), { expires: 7 });
    },
    resetUserInfo: (state) => {
      state.userInfo = null;
      Cookies.remove("user");
      Cookies.remove("counter");
      Cookies.remove("orderId");
    },
  },
});

const userActions = userSlice.actions;
const userReducers = userSlice.reducer;

export { userActions, userReducers };
