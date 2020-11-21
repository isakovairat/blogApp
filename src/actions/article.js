import { GET_ARTICLE_REQUEST, GET_ARTICLE_SUCCESS, GET_ARTICLE_ERROR } from './types';
import { getArticle } from '../api';

const getArticleAction = () => {
  return async (dispatch, getState) => {
    const { location } = getState().router;
    const slug = location.pathname.split('/').pop();
    dispatch({ type: GET_ARTICLE_REQUEST });
    try {
      const article = await getArticle(slug);
      dispatch({ type: GET_ARTICLE_SUCCESS, payload: article });
    } catch (error) {
      dispatch({ type: GET_ARTICLE_ERROR });
    }
  };
};

export default getArticleAction;
