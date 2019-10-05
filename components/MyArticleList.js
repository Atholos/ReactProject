/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import {List} from 'native-base';
import MyArticleListItem from './MyArticleListItem';
import ArticleHooks from '../hooks/ArticleHooks';

const MyArticleList = (props) => {
  const {navigation} = props;
  const {getAllMyArticles} = ArticleHooks();
  const [myMedia, loading] = getAllMyArticles();
  console.log(loading);
  console.log('media', myMedia);
  return (
    <List
      dataArray={myMedia}
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