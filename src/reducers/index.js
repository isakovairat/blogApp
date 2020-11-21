import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import articlesReducer from './articles/reducer';
import appInfoReducer from './appInfo/reducer';
import articleReducer from './article/reducer';

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    appInfo: appInfoReducer,
    articles: articlesReducer,
    article: articleReducer,
  });

export default createRootReducer;
