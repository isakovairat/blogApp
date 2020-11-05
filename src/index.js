import React from "react";
import ReactDOM from 'react-dom';
import './index.scss';
import {Provider} from "react-redux";
import {ConnectedRouter} from 'connected-react-router'
import {Switch, Route} from 'react-router-dom';
import {store, history} from "./store/configureStore";
import App from "./components/App";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={App}/>
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
