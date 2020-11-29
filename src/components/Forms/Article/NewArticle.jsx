import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button } from 'antd';
import * as classes from './NewArticle.module.scss';
import { useCookies } from 'react-cookie';
import { useHistory, useParams } from 'react-router-dom';
import { articleCRUD } from '../../../api';
import { connect } from 'react-redux';
import getArticleAction from '../../../actions/article';
import { GET_ARTICLE_SUCCESS } from '../../../actions/types';

const NewArticle = ({ article, getArticle, setArticle, currentUser }) => {
  const tagsListInitState = article.article ? article.article.tagList : [];
  const { handleSubmit, control, errors } = useForm();
  const [cookies] = useCookies(['token']);
  const [tagsList, setTagsList] = useState(tagsListInitState);
  const { slug } = useParams();
  const history = useHistory();

  if (!cookies.token) history.push('/sign-in');

  useEffect(() => {
    if (!slug) {
      setArticle(null);
    } else if (!article.article) {
      getArticle();
    }
  }, [slug]);

  const onSubmit = (data) => {
    const { title, description, text, ...tags } = data;
    const { token } = cookies;

    const body = {
      article: { title, description, body: text, tagList: Object.values(tags) },
    };

    if (slug && article.article) {
      articleCRUD({ token, crudParam: 'U', body, slug })
        .then((response) => {
          history.push(`/articles/${response.article.slug}`);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      articleCRUD({ token, crudParam: 'C', body })
        .then((response) => {
          setArticle(response.article);
          history.push(`/articles/${response.article.slug}`);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const formTitle =
    article.article && article.article.author.username === currentUser.user.username
      ? 'Edit article'
      : 'Create new article';

  const renderTagsList = () => {
    if (!tagsList.length) {
      return (
        <Button
          className={classes.addTag}
          onClick={() => {
            setTagsList([...tagsList, '']);
          }}
        >
          Add tag
        </Button>
      );
    }

    return tagsList.map((tag, index) => {
      if (index === tagsList.length - 1) {
        return (
          <div key={`tag_${index}`} className={classes.tagContainer}>
            <div className={classes.tag}>
              <Controller
                as={Input}
                size="large"
                name={`tag_${index}`}
                control={control}
                defaultValue={
                  article.article && article.article.author.username === currentUser.user.username
                    ? tagsList[index]
                    : ''
                }
                placeholder="Tag"
                rules={{ required: true }}
              />
              {errors[`tag_${index}`] && (
                <span className={classes.errorNotification}>Please input some tag for the article</span>
              )}
            </div>
            <div className={classes.btns}>
              <Button
                className={classes.addTag}
                onClick={() => {
                  setTagsList([...tagsList, '']);
                }}
              >
                Add tag
              </Button>
              <Button
                danger
                className={classes.deleteTag}
                onClick={() => {
                  setTagsList([...tagsList].filter((_, idx) => index !== idx));
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        );
      }

      return (
        <div key={`tag_${index}`} className={classes.tagContainer}>
          <div className={classes.tag}>
            <Controller
              as={Input}
              size="large"
              name={`tag_${index}`}
              control={control}
              defaultValue={
                article.article && article.article.author.username === currentUser.user.username ? tagsList[index] : ''
              }
              placeholder="Tag"
              rules={{ required: true }}
            />
            {errors[`tag_${index}`] && (
              <span className={classes.errorNotification}>Please input some tag for the article</span>
            )}
          </div>
          <div className={classes.btns}>
            <Button
              danger
              className={classes.deleteTag}
              onClick={() => {
                setTagsList([...tagsList].filter((_, idx) => index !== idx));
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className={classes.create}>{formTitle}</h2>
        <div className={classes.input}>
          <label className={classes.label} htmlFor="title">
            Title
          </label>
          <Controller
            as={Input}
            type="text"
            name="title"
            size="large"
            control={control}
            placeholder="Title"
            rules={{ required: true }}
            defaultValue={
              article.article && article.article.author.username === currentUser.user.username
                ? article.article.title
                : ''
            }
          />
          {errors.title && <span className={classes.errorNotification}>Please input some title for the article</span>}
        </div>
        <div className={classes.input}>
          <label className={classes.label} htmlFor="description">
            Short description
          </label>
          <Controller
            as={Input}
            type="text"
            name="description"
            size="large"
            control={control}
            placeholder="Short description"
            rules={{ required: true }}
            defaultValue={
              article.article && article.article.author.username === currentUser.user.username
                ? article.article.description
                : ''
            }
          />
          {errors.description && (
            <span className={classes.errorNotification}>Please input some short description for the article</span>
          )}
        </div>
        <div className={classes.textArea}>
          <label className={classes.label} htmlFor="text">
            Text
          </label>
          <Controller
            as={Input.TextArea}
            size="large"
            name="text"
            control={control}
            placeholder="Text"
            rules={{ required: true }}
            autoSize={{ minRows: 5, maxRows: 9 }}
            defaultValue={
              article.article && article.article.author.username === currentUser.user.username
                ? article.article.body
                : ''
            }
          />
          {errors.text && <span className={classes.errorNotification}>Please input some text for the article</span>}
        </div>
        <div>
          <label className={classes.label} htmlFor="tags">
            Tags
          </label>
          {renderTagsList()}
        </div>
        <div className={classes.btn}>
          <Button htmlType="submit" type="primary" shape="round" size="large" style={{ width: '35%' }}>
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  article: state.article,
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  getArticle: () => dispatch(getArticleAction()),
  setArticle: (data) => dispatch({ type: GET_ARTICLE_SUCCESS, payload: { article: data } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle);
