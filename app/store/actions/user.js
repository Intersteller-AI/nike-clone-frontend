import { userActions } from '../reducers/user'

export const logout = (dispatch) => {
  dispatch(userActions.resetUserInfo());
};
