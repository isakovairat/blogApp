import { GET_ARTICLES_SUCCESS, GET_ARTICLES_REQUEST, GET_ARTICLES_ERROR } from './types';
import { getArticles } from '../api';

const getArticlesAction = () => {
  return async (dispatch, getState) => {
    const { currentPage } = getState().appInfo;
    dispatch({ type: GET_ARTICLES_REQUEST });
    try {
      const articles = await getArticles(currentPage);
      dispatch({ type: GET_ARTICLES_SUCCESS, payload: articles });
    } catch (error) {
      dispatch({ type: GET_ARTICLES_ERROR });
    }
  };
};

export default getArticlesAction;
