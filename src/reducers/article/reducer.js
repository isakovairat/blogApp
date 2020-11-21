import articleInitialState from './state';
import { GET_ARTICLE_REQUEST, GET_ARTICLE_SUCCESS, GET_ARTICLE_ERROR} from '../../actions/types';

const articleReducer = (state = articleInitialState, action) => {
  switch (action.type) {
    default:
      return state;
    case GET_ARTICLE_REQUEST:
      return { ...state, isLoading: true};
    case GET_ARTICLE_SUCCESS:
      return { ...state, article: action.payload.article, isLoading: false };
    case GET_ARTICLE_ERROR:
      return { ...state, isLoading: false, isError: true, article: {}};
  }
}

export default articleReducer;