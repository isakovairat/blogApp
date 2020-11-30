import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as classes from '../Article/Article.module.scss';
import { HeartTwoTone } from '@ant-design/icons';
import { Spin, Tag, Popconfirm, message, Button } from 'antd';
import getArticleAction from '../../actions/article';
import * as dayjs from 'dayjs';
import { useCookies } from 'react-cookie';
import { articleCRUD, likesCD } from '../../api';
import { useHistory, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { GET_ARTICLE_SUCCESS } from '../../actions/types';

const Article = ({ article, getArticle, currentUser, setArticle }) => {
  const [cookies] = useCookies(['token']);
  const { slug } = useParams();
  const history = useHistory();
  const [likesInfo, setLikesInfo] = useState({
    favoritesCount: article.article ? article.article.favoritesCount : 0,
    favorited: article.article ? article.article.favorited : false,
  });

  useEffect(() => {
    if (!slug) {
      setArticle(null);
    } else if (!article.article) {
      getArticle();
    }
  }, [article.article, getArticle, setArticle, slug]);

  useEffect(() => {
    setLikesInfo({ favoritesCount: article.article ? article.article.favoritesCount : 0 });
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

  const confirm = () => {
    message.info('The article was deleted.');
    articleCRUD({ token: cookies.token, slug: article.article.slug, crudParam: 'D' })
      .then(() => {
        history.push('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const renderBtns = () => {
    if (article.article.author.username === currentUser.user.username) {
      return (
        <div className={classes.btns}>
          <Popconfirm
            placement="rightTop"
            title="Are you sure to delete this article?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
          >
            <Button danger className={classes.delete}>
              Delete
            </Button>
          </Popconfirm>
          <Button
            className={classes.create}
            onClick={() => {
              history.push(`./${article.article.slug}/edit`);
            }}
          >
            Edit
          </Button>
        </div>
      );
    }

    return null;
  };

  const renderArticle = () => {
    if (article.isLoading || currentUser.isLoading) {
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
              <Button className={classes.likeBtn} disabled={!currentUser.user} onClick={handleLike}>
                <HeartTwoTone twoToneColor={!currentUser.user ? '#e5e5e5' : '#eb2f96'} style={{ fontSize: 18 }} />
                <span className={classes.title__likes}>{likesInfo.favoritesCount}</span>
              </Button>
            </div>
            <div className={classes.tags}>
              {article.article.tagList.length > 0 && article.article.tagList.map((tag) => <Tag key={tag}>{tag}</Tag>)}
            </div>
            <div className={classes.summary}>
              <p>{article.article.description}</p>
            </div>
            <ReactMarkdown plugins={[gfm]} children={article.article.body} />
          </div>
          <div>
            <div className={classes.userInfo}>
              <div>
                <h6 className={classes.userInfo__name}>{article.article.author.username}</h6>
                <span className={classes.userInfo__date}>
                  {dayjs(new Date(article.article.createdAt)).format('MMMM D, YYYY')}
                </span>
              </div>
              <img
                className={classes.userInfo__avatar}
                src={article.article.author.image}
                alt={article.article.author.image}
              />
            </div>
            {renderBtns()}
          </div>
        </div>
      );
    }

    return (
      <div className={classes.spinnerContainer}>
        <Spin size="large" />
      </div>
    );
  };

  return renderArticle();
};

const mapStateToProps = (state) => ({
  article: state.article,
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  getArticle: () => dispatch(getArticleAction()),
  setArticle: (data) => dispatch({ type: GET_ARTICLE_SUCCESS, payload: { article: data } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);
