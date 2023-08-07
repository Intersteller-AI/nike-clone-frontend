import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";


const productInitialState = {
  productInfo: null,
};

const productSlice = createSlice({
  name: "product",
  initialState: productInitialState,
  reducers: {
    setProductInfo: (state, action) => {
      state.productInfo = action.payload;
      Cookies.set("product", JSON.stringify(action.payload), { expires: 7 });
    },
    resetProductInfo: (state, action) => {
      state.productInfo = null;
      Cookies.remove("product");
    },
  },
});

const productActions = productSlice.actions;
const productReducers = productSlice.reducer;

export { productActions, productReducers };
