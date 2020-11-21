import React from 'react';
import Header from '../Header';
import ArticleList from '../ArticleList';
import { Route, Switch } from 'react-router-dom';
import Article from '../Article';
import SignUp from '../SignUp';

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={ArticleList} />
        <Route exact path="/articles" component={ArticleList} />
        <Route path="/articles/:slug" component={Article} />
        <Route exact path="/sign-up" component={SignUp} />
        {/*<Route exact path="/sign-in" component={} />*/}
      </Switch>
    </div>
  );
};

export default App;
