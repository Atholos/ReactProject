/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import {List as BaseList} from 'native-base';
import MyFilesListItem from './MyArticleListItem';
import ArticleHooks from '../hooks/ArticleHooks';
import Article from '../views/Article';

const MyFilesList = (props) => {
  const {navigation} = props;
  const {getAllMyArticles} = ArticleHooks();
  const [myMedia, loading] = getAllMyArticles();
  console.log(loading);
  console.log('media', myMedia);
  return (
    <BaseList
      dataArray={myMedia}
      renderRow={(item) =>
        <MyFilesListItem navigation={navigation} singleMedia={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

MyFilesList.propTypes = {
  navigation: PropTypes.object,
};

export default MyFilesList;