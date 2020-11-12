import React from 'react';
import { Link } from 'react-router-dom';
import * as classes from './Header.module.scss';

const Header = () => {
  return (
    <div className={classes.container}>
      <Link to="/" className={classes.link}>
        Realworld Blog
      </Link>
      <ul>
        <li>
          <Link to="/login">Sign in</Link>
        </li>
        <li>
          <Link to="/register" className={classes.register}>
            Sign up
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
