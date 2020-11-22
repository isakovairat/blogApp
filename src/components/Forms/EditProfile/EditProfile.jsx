import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button } from 'antd';
import * as classes from '../Sign.module.scss';

const EditProfile = () => {
  const { handleSubmit, control, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className={classes.create}>Edit Profile</h2>
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
            New password
          </label>
          <Controller
            as={Input.Password}
            size="large"
            name="password"
            control={control}
            defaultValue=""
            placeholder="New password"
            rules={{ required: true, minLength: 8, maxLength: 40 }}
          />
          {errors.password && <span className={classes.errorNotification}>Please input your new password</span>}
        </div>
        <div className={classes.input}>
          <label className={classes.label} htmlFor="avatar">
            Avatar image (url)
          </label>
          <Controller
            as={Input}
            type="text"
            name="avatar"
            size="large"
            control={control}
            defaultValue=""
            placeholder="Avatar image"
          />
        </div>
        <div className={classes.btn}>
          <Button htmlType="submit" type="primary" shape="round" size="large" style={{ width: '100%' }}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
