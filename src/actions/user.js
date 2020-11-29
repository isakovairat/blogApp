import { GET_USER_ERROR, GET_USER_REQUEST, GET_USER_SUCCESS } from './types';
import { getUser } from '../api';

export const setUserAction = (user) => {
  return (dispatch) => {
    dispatch({ type: GET_USER_SUCCESS, payload: user });
  };
};

export const getUserAction = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
      const user = await getUser(token);
      dispatch({ type: GET_USER_SUCCESS, payload: user.user });
    } catch (error) {
      dispatch({ type: GET_USER_ERROR });
    }
  };
};
