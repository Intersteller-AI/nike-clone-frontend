import { productActions } from "../reducers/product";


export const clearProduct = (dispatch) => {
  dispatch(productActions.resetProductInfo());
};
