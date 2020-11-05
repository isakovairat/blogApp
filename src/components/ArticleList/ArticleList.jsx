import React from 'react';
import ArticleListItem from "../ArticleListItem";
import * as classes from './ArticleList.module.scss';
import {Pagination} from "antd";

const ArticleList = () => {
  return (
    <div className={classes.container}>
      <ArticleListItem/>
      <ArticleListItem/>
      <ArticleListItem/>
      <ArticleListItem/>
      <ArticleListItem/>
      <Pagination size="small" total={50} />
    </div>
  );
}

export default ArticleList;
