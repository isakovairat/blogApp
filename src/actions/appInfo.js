import { CHANGE_PAGE } from './types';
import getArticlesAction from './articles';

export const changePageAction = (page) => {
  return async (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
    dispatch(getArticlesAction());
  };
};
