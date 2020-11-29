import React from 'react';
import * as classes from './ArticleListItem.module.scss';
import { HeartTwoTone } from '@ant-design/icons';
import { Tag, Button } from 'antd';
import { Link } from 'react-router-dom';
import * as dayjs from 'dayjs';
import { DEFAULT_IMG } from '../../api';
import { connect } from 'react-redux';

const ArticleListItem = ({ article, currentUser }) => {
  return (
    <div className={classes.container}>
      <div className={classes.textInfo}>
        <div className={classes.title}>
          <Link to={`/articles/${article.slug}`}>
            <h5 className={classes.title__text}>{article.title}</h5>
          </Link>
          <Button
            className={classes.likeBtn}
            disabled={!currentUser.user}
            onClick={() => {
              // TODO обработчик лайков
            }}
          >
            <HeartTwoTone twoToneColor={!currentUser.user ? '#e5e5e5' : '#eb2f96'} style={{ fontSize: 18 }} />
            <span className={classes.title__likes}>{article.favoritesCount}</span>
          </Button>
        </div>
        <div className={classes.tags}>
          {article.tagList.length > 0 && article.tagList.map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
        <div className={classes.summary}>
          <p>{article.description}</p>
        </div>
      </div>
      <div className={classes.userInfo}>
        <div>
          <h6 className={classes.userInfo__name}>{article.author.username}</h6>
          <span className={classes.userInfo__date}>{dayjs(new Date(article.createdAt)).format('MMMM D, YYYY')}</span>
        </div>
        <img className={classes.userInfo__avatar} src={article.author.image || DEFAULT_IMG} alt={'Avatar'} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps)(ArticleListItem);
