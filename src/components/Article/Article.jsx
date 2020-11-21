import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as classes from '../Article/Article.module.scss';
import { HeartTwoTone } from '@ant-design/icons';
import { Spin, Tag } from 'antd';
import getArticleAction from '../../actions/article';
import * as dayjs from 'dayjs';

const Article = ({ article, getArticle }) => {
  useEffect(() => {
    getArticle();
  }, []);

  const renderArticle = () => {
    if (article.isLoading) {
      return (
        <div className={classes.spinnerContainer}>
          <Spin size="large" />
        </div>
      );
    }

    if (article.article) {
      return (
        <div className={classes.container}>
          <div className={classes.textInfo}>
            <div className={classes.title}>
              <h5 className={classes.title__text}>{article.article.title}</h5>
              <HeartTwoTone twoToneColor="#eb2f96" style={{ fontSize: 18 }} />
              <span className={classes.title__likes}>{article.article.favoritesCount}</span>
            </div>
            <div className={classes.tags}>
              {article.article.tagList.length > 0 && article.article.tagList.map((tag) => <Tag key={tag}>{tag}</Tag>)}
            </div>
            <div className={classes.summary}>
              <p>{article.article.description}</p>
            </div>
            <p>{article.article.body}</p>
          </div>
          <div className={classes.userInfo}>
            <div>
              <h6 className={classes.userInfo__name}>{article.article.author.username}</h6>
              <span className={classes.userInfo__date}>
                {dayjs(new Date(article.createdAt)).format('MMMM D, YYYY')}
              </span>
            </div>
            <img
              className={classes.userInfo__avatar}
              src={article.article.author.image}
              alt={article.article.author.image}
            />
          </div>
        </div>
      );
    }
  };

  return renderArticle();
};

const mapStateToProps = (state) => ({
  article: state.article,
});

const mapDispatchToProps = (dispatch) => ({
  getArticle: () => dispatch(getArticleAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);
