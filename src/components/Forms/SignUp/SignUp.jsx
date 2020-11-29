import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button, Checkbox } from 'antd';
import * as classes from '../Sign.module.scss';
import { Link, useHistory } from 'react-router-dom';
import { signUpRequest } from '../../../api';
import { useCookies } from 'react-cookie';
import { setUserAction } from '../../../actions/user';

const SignUp = () => {
  const { handleSubmit, control, errors, watch } = useForm();
  const [remember, setRemember] = useState(false);
  const [showRememberAlert, setShowRememberAlert] = useState(false);
  const [cookies, setCookie] = useCookies(['token']);
  const history = useHistory();

  if (!cookies.token) {
    history.push('/');
  }

  const onSubmit = (data) => {
    if (!remember) {
      setShowRememberAlert(true);
      return;
    }
    setShowRememberAlert(false);
    const { username, email, password } = data;
    const body = {
      user: { username, email, password },
    };
    signUpRequest(body)
      .then((response) => {
        if (response.errors) {
          // TODO обработчик ошибок
        } else {
          const { user } = response;
          setCookie('token', user.token);
          setUserAction(user);
          history.push('/');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className={classes.create}>Create new account</h2>
        <div className={classes.input}>
          <label className={classes.label} htmlFor="username">
            Username
          </label>
          <Controller
            as={Input}
            type="text"
            name="username"
            size="large"
            control={control}
            defaultValue=""
            placeholder="Username"
            rules={{ required: true, maxLength: 20, minLength: 3 }}
          />
          {errors.username && <span className={classes.errorNotification}>Please input your username</span>}
        </div>

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
            rules={{ required: true, minLength: 8, maxLength: 40 }}
          />
          {errors.password && (
            <span className={classes.errorNotification}>Please input your password (min 6 characters)</span>
          )}
        </div>

        <div className={classes.input}>
          <label className={classes.label} htmlFor="passwordCopy">
            Repeat password
          </label>
          <Controller
            as={Input.Password}
            name="passwordCopy"
            control={control}
            size="large"
            defaultValue=""
            placeholder="Password"
            rules={{ required: true, minLength: 6, maxLength: 40 }}
          />
          {errors.passwordCopy && (
            <span className={classes.errorNotification}>Your password needs to be at least 6 characters.</span>
          )}
          {watch('password') !== watch('passwordCopy') && watch('passwordCopy') !== '' && (
            <span className={classes.errorNotification}>Passwords must match!</span>
          )}
        </div>
        <hr className={classes.hr} />
        <div>
          <Checkbox
            name="remember"
            size="large"
            children="I agree to the processing of my personal information"
            checked={remember}
            onChange={() => setRemember(!remember)}
            style={{ color: '#8C8C8C' }}
          />
          {showRememberAlert && <span className={classes.errorNotification}>Please check the agreement</span>}
        </div>

        <div className={classes.btn}>
          <Button htmlType="submit" type="primary" shape="round" size="large" style={{ width: '100%' }}>
            Create
          </Button>
        </div>
        <div className={classes.haveAccount}>
          <span> Already have an account?&nbsp;</span>
          <Link to="/sign-in">Sign In.</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
