import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as classes from './Header.module.scss';
import changePageAction from '../../actions/appInfo';
import { useCookies } from 'react-cookie';
import { Button } from 'antd';
import { getUserAction, setUserAction } from '../../actions/user';
import { DEFAULT_IMG } from '../../api';

const Header = ({ changePage, currentUser, getUser }) => {
  const [cookies, setCookie] = useCookies(['token']);
  const history = useHistory();

  useEffect(() => {
    console.log(cookies.token);
    if (cookies.token) getUser(cookies.token);
  }, [cookies.token, getUser]);

  const handleLogOut = () => {
    setCookie('token', '', { maxAge: -1 });
    setUserAction(null);
    history.push('/');
  };

  const renderUnauthorizedUserContent = () => {
    if (!currentUser) {
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
    if (currentUser) {
      const { username, image } = currentUser;
      return (
        <ul>
          <li>
            <Link to="/new-article">Create article</Link>
          </li>
          <li>
            <Link to="/profile">
              <h6 className={classes.userInfo__name}>{username}</h6>
              <img className={classes.userInfo__avatar} src={image || DEFAULT_IMG} alt="Avatar" />
            </Link>
          </li>
          <li>
            <Button type="button" onClick={handleLogOut}>
              Log Out
            </Button>
          </li>
        </ul>
      );
    }
    return null;
  };

  return (
    <div className={classes.container}>
      <Link to="/" className={classes.link} onClick={() => changePage(1)}>
        Realworld Blog
      </Link>
      {renderUnauthorizedUserContent()}
      {renderAuthorizedUserContent()}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changePage: (page) => dispatch(changePageAction(page)),
  getUser: (token) => dispatch(getUserAction(token)),
});

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
