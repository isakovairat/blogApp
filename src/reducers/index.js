import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import articlesReducer from './articles/reducer';
import appInfoReducer from './appInfo/reducer';
import articleReducer from './article/reducer';
import currentUserReducer from './currentUser/reducer';

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    appInfo: appInfoReducer,
    articles: articlesReducer,
    article: articleReducer,
    currentUser: currentUserReducer,
  });

export default createRootReducer;
