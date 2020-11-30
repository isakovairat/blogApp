import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button } from 'antd';
import * as classes from '../Sign.module.scss';
import { Link, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { authRequest } from '../../../api';
import { setUserAction } from '../../../actions/user';

const SignIn = () => {
  const { handleSubmit, control, errors } = useForm();
  const [cookies, setCookie] = useCookies(['token']);
  const history = useHistory();
  const [serverErrors, setServerErrors] = useState({});

  if (cookies.token) {
    history.push('/');
  }

  const onSubmit = (data) => {
    const { email, password } = data;
    const body = {
      user: { email, password },
    };
    authRequest(body).then((response) => {
      if (response.errors) {
        setServerErrors({ ...response.errors });
      } else {
        setServerErrors({});
        const { user } = response;
        setCookie('token', user.token);
        setUserAction(user);
        history.push('/');
      }
    });
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className={classes.create}>Sign In</h2>
        <div className={classes.input}>
          <label className={classes.label} htmlFor="email">
            Email address
          </label>
          <Controller
            as={Input}
            type="email"
            name="email"
            size="large"
            control={control}
            defaultValue=""
            placeholder="Email address"
            rules={{ required: true }}
          />
          {errors.email && <span className={classes.errorNotification}>Please input your email address</span>}
          {serverErrors['email or password'] && (
            <span
              className={classes.errorNotification}
            >{`Email or password ${serverErrors['email or password'][0]}`}</span>
          )}
        </div>
        <div className={classes.input}>
          <label className={classes.label} htmlFor="password">
            Password
          </label>
          <Controller
            as={Input.Password}
            size="large"
            name="password"
            control={control}
            defaultValue=""
            placeholder="Password"
            rules={{ required: true }}
          />
          {errors.password && <span className={classes.errorNotification}>Please input your password</span>}
          {serverErrors['email or password'] && (
            <span
              className={classes.errorNotification}
            >{`Email or password ${serverErrors['email or password'][0]}`}</span>
          )}
        </div>
        <div className={classes.btn}>
          <Button htmlType="submit" type="primary" shape="round" size="large" style={{ width: '100%' }}>
            Login
          </Button>
        </div>
        <div className={classes.haveAccount}>
          <span>Don't have an account?&nbsp;</span>
          <Link to="/sign-up">Sign Up.</Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
