import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as classes from './Header.module.scss';
import { changePageAction } from '../../actions/appInfo';

const Header = ({ changePage }) => {
  const handleClick = () => {
    changePage(1);
  };

  return (
    <div className={classes.container}>
      <Link to="/" className={classes.link} onClick={handleClick}>
        Realworld Blog
      </Link>
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
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changePage: (page) => dispatch(changePageAction(page)),
});

export default connect(null, mapDispatchToProps)(Header);
