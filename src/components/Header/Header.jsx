import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as classes from './Header.module.scss';
import changePageAction from '../../actions/appInfo';
import { useCookies } from 'react-cookie';
import { Button, Spin } from 'antd';
import { getUserAction, setUserAction } from '../../actions/user';
import { DEFAULT_IMG } from '../../api';
import { GET_ARTICLE_SUCCESS } from '../../actions/types';

const Header = ({ changePage, currentUser, getUser, setArticle, setUser }) => {
  const [cookies, setCookie] = useCookies(['token']);
  const history = useHistory();

  useEffect(() => {
    if (cookies.token) {
      getUser(cookies.token);
    }
  }, [cookies.token, getUser]);

  const handleLogOut = () => {
    setCookie('token', '', { maxAge: -1 });
    setUser(null);
    history.push('./');
  };

  const renderUnauthorizedUserContent = () => {
    if (!currentUser.user) {
      return (
        <ul>
          <li>
            <Link to="/sign-in">Sign in</Link>
          </li>
          <li>
            <Link to="/sign-up" className={classes.register}>
              Sign up
            </Link>
          </li>
        </ul>
      );
    }
    return null;
  };

  const renderAuthorizedUserContent = () => {
    if (currentUser.user) {
      const { username, image } = currentUser.user;
      return (
        <div className={classes.authorized}>
          <Link to="/new-article">
            <Button className={classes.create} onClick={() => setArticle(null)}>
              Create article
            </Button>
          </Link>
          <Link to="/profile" className={classes.userInfo}>
            <h6 className={classes.userInfo__name}>{username || 'John Doe'}</h6>
            <img className={classes.userInfo__avatar} src={image || DEFAULT_IMG} alt="Avatar" />
          </Link>
          <Button type="button" onClick={handleLogOut} className={classes.logout}>
            Log Out
          </Button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={classes.container}>
      <Link
        to="/"
        className={classes.link}
        onClick={() => {
          changePage(1);
        }}
      >
        Realworld Blog
      </Link>
      {currentUser.isLoading && <Spin size="large" />}
      {renderUnauthorizedUserContent()}
      {renderAuthorizedUserContent()}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changePage: (page) => dispatch(changePageAction(page)),
  getUser: (token) => dispatch(getUserAction(token)),
  setArticle: (data) => dispatch({ type: GET_ARTICLE_SUCCESS, payload: { article: data } }),
  setUser: (data) => dispatch(setUserAction(data)),
});

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
