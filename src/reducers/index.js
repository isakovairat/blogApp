import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import articlesReducer from './articles/reducer';
import appInfoReducer from './appInfo/reducer';

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    appInfo: appInfoReducer,
    articles: articlesReducer,
  });

export default createRootReducer;
