/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import {List} from 'native-base';
import MyArticleListItem from './MyArticleListItem';
import ArticleHooks from '../hooks/ArticleHooks';

const MyArticleList = (props) => {
  const {navigation} = props;
  const {getAllMyArticles} = ArticleHooks();
  const [myArticles, loading] = getAllMyArticles();
  console.log(loading);
  console.log('media', myArticles);
  return (
    <List
      dataArray={myArticles}
      renderRow={(item) =>
        <MyArticleListItem navigation={navigation} singleMedia={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

MyArticleList.propTypes = {
  navigation: PropTypes.object,
};

export default MyArticleList;