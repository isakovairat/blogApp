import React from 'react';
import * as classes from './ArticleListItem.module.scss';
import { HeartTwoTone } from '@ant-design/icons';
import { Tag, Button } from 'antd';
import { Link } from 'react-router-dom';
import * as dayjs from 'dayjs';

const likeBtnStyle = {
  border: 'none',
  backgroundColor: 'transparent',
  padding: '0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: 'none',
};

const ArticleListItem = (props) => {
  const { article } = props;
  return (
    <div className={classes.container}>
      <div className={classes.textInfo}>
        <div className={classes.title}>
          <Link to={`/articles/${article.slug}`}>
            <h5 className={classes.title__text}>{article.title}</h5>
          </Link>
          <Button style={likeBtnStyle}>
            <HeartTwoTone twoToneColor="#eb2f96" style={{ fontSize: 18 }} />
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
        <img className={classes.userInfo__avatar} src={article.author.image} alt={article.author.image} />
      </div>
    </div>
  );
};

export default ArticleListItem;
