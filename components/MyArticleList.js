/* eslint-disable linebreak-style */
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {List} from 'native-base';
import {StyleSheet} from 'react-native';
import MyArticleListItem from './MyArticleListItem';
import ArticleHooks from '../hooks/ArticleHooks';
import appHooks from '../hooks/MainHooks';


const MyArticleList = (props) => {
  const {getUser} = appHooks();
  const {navigation} = props;
  const {getMyArticleTags} = ArticleHooks();
  const [user, setUser] = useState({});


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

  const [myArticles, loading] = getMyArticleTags();

  return (
    <List
      style={styles.back}
      dataArray={myArticles}
      renderRow={(item) =>
        <MyArticleListItem navigation={navigation} singleMedia={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  back: {
    backgroundColor: '#5a5255',
  },
});

MyArticleList.propTypes = {
  navigation: PropTypes.object,
};

export default MyArticleList;
