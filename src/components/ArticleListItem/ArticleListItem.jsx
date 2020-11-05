import React from 'react';
import * as classes from './ArticleListItem.module.scss';
import { HeartTwoTone } from '@ant-design/icons';
import { Tag } from 'antd';

const ArticleListItem = () => {
  return (
    <div className={classes.container}>
      <div className={classes.textInfo}>
        <div className={classes.title}>
          <h5 className={classes.title__text}>Some article title</h5>
          <HeartTwoTone twoToneColor="#eb2f96" style={{ fontSize: 18}}/>
          <span className={classes.title__likes}>12</span>
        </div>
        <div className={classes.tags}>
          <Tag>tag 1</Tag>
          <Tag>tag 2</Tag>
        </div>
        <div className={classes.summary}>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, dolores ea fugiat, illum itaque libero minus nulla odio optio perspiciatis praesentium provident quam quibusdam sit tempore tenetur unde! Perferendis, temporibus!</p>
        </div>
      </div>
      <div className={classes.userInfo}>
        <div>
          <h6 className={classes.userInfo__name}>John Doe</h6>
          <span className={classes.userInfo__date}>March 5, 2020</span>
        </div>
        <div className={classes.userInfo__avatar} />
      </div>
    </div>
  );
}

export default ArticleListItem;
