import React from 'react';
import Header from "../Header";
import ArticleList from "../ArticleList";
// import Article from "../Article";

const App = () => {
  return (
    <div>
      {/*<Switch>*/}
        {/*<Route exact path="/articles" component/>*/}
      {/*</Switch>*/}
      <Header/>
      <ArticleList/>
      {/*<Article/>*/}
    </div>
  );
}

export default App;
