import React from 'react';
import Header from '../Header';
import ArticleList from '../ArticleList';
import { Route, Switch } from 'react-router-dom';
import Article from '../Article';

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={ArticleList} />
        <Route path="/article/1" component={Article} />
      </Switch>
    </div>
  );
};

export default App;
