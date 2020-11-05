import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from '../reducers/index';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {logger} from "redux-logger/src";

export const history = createBrowserHistory();

export const store = createStore(
  createRootReducer(history),
  composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk, logger))
);
