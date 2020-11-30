import React, { useEffect, useState } from 'react';
import * as classes from './ArticleListItem.module.scss';
import { HeartTwoTone } from '@ant-design/icons';
import { Tag, Button } from 'antd';
import { Link } from 'react-router-dom';
import * as dayjs from 'dayjs';
import { DEFAULT_IMG, likesCD } from '../../api';
import { connect } from 'react-redux';
import { useCookies } from 'react-cookie';

const ArticleListItem = ({ article, currentUser }) => {
  const [likesInfo, setLikesInfo] = useState({
    favoritesCount: article ? article.favoritesCount : 0,
    favorited: article ? article.favorited : false,
  });
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    setLikesInfo({ favoritesCount: article ? article.favoritesCount : 0 });
  }, [article]);

  const handleLike = () => {
    const { slug } = article;
    const { token } = cookies;

    if (likesInfo.favorited) {
      likesCD({ token, slug, crudParam: 'D' })
        .then((response) => {
          setLikesInfo({ favorited: response.article.favorited, favoritesCount: response.article.favoritesCount });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      likesCD({ token, slug, crudParam: 'C' })
        .then((response) => {
          setLikesInfo({ favorited: response.article.favorited, favoritesCount: response.article.favoritesCount });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.textInfo}>
        <div className={classes.title}>
          <Link to={`/articles/${article.slug}`}>
            <h5 className={classes.title__text}>{article.title}</h5>
          </Link>
          <Button className={classes.likeBtn} disabled={!currentUser.user} onClick={handleLike}>
            <HeartTwoTone twoToneColor={!currentUser.user ? '#e5e5e5' : '#eb2f96'} style={{ fontSize: 18 }} />
            <span className={classes.title__likes}>{likesInfo.favoritesCount}</span>
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
