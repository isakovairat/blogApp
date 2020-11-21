import articlesInitialState from './state';
import { GET_ARTICLES_REQUEST, GET_ARTICLES_SUCCESS, GET_ARTICLES_ERROR } from '../../actions/types';

const articlesReducer = (state = articlesInitialState, action) => {
  switch (action.type) {
    default:
      return state;
    case GET_ARTICLES_REQUEST:
      return { ...state, isLoading: true };
    case GET_ARTICLES_SUCCESS:
      return { ...state, articles: action.payload.articles, articlesCount: action.payload.articlesCount, isLoading: false, isError: false };
    case GET_ARTICLES_ERROR:
      return { ...state, isLoading: false, isError: true, articles: [], articlesCount: 0 };
  }
}

export default articlesReducer;