import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ArticleListItem from '../ArticleListItem';
import * as classes from './ArticleList.module.scss';
import { Pagination, Spin } from 'antd';
import getArticlesAction from '../../actions/articles';
import changePageAction from '../../actions/appInfo';
import { useHistory } from 'react-router-dom';

const ArticleList = ({ getArticles, changePage, articles, appInfo }) => {
  const history = useHistory();

  useEffect(() => {
    getArticles();
  }, []);

  const { currentPage } = appInfo;

  const renderArticleList = () => {
    if (articles.isLoading) {
      return (
        <div className={classes.spinnerContainer}>
          <Spin size="large" />
        </div>
      );
    }

    return (
      <div className={classes.container}>
        {articles.articles.map((article) => {
          return <ArticleListItem key={article.slug} article={article} />;
        })}
        <div className={classes.pagination}>
          <Pagination
            defaultCurrent={1}
            current={currentPage}
            size="small"
            total={articles.articlesCount}
            onChange={(page) => {
              history.push(`./articles?page=${page}`);
              changePage(page);
            }}
          />
        </div>
      </div>
    );
  };

  return renderArticleList();
};

const mapStateToProps = (state) => ({
  articles: state.articles,
  appInfo: state.appInfo,
});

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAction()),
  changePage: (page) => dispatch(changePageAction(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
