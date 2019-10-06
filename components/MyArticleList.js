/* eslint-disable linebreak-style */
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {List} from 'native-base';
import MyArticleListItem from './MyArticleListItem';
import ArticleHooks from '../hooks/ArticleHooks';
import appHooks from '../hooks/MainHooks';


const MyArticleList = (props) => {
  const {getUser} = appHooks();
  const {navigation} = props;
  const {getAllMyArticles} = ArticleHooks();
  const [user, setUser] = useState({});
  console.log(loading);
  console.log('media', myArticles);


  useEffect(() => {
    getUser().then((json) => {
      const parsedJson = JSON.parse(json);
      setUser(
          {
            id: parsedJson.user_id,
          }
      );
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const [myArticles, loading] = getAllMyArticles(user.id);


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
