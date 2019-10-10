import React, {keyExtractor} from "react";
import {StyleSheet} from 'react-native';
import PropTypes from "prop-types";
import ArticleListItem from "./ArticleListItem";
import { List, Content } from 'native-base';
import ArticleHooks from '../hooks/ArticleHooks';
import Filter from './Filter'


const ArticleList = (props) => {
  const { navigation } = props;

  const {
    useFetch,
    getThumbnail,
  } = ArticleHooks();

  const [articles, loading] = useFetch('http://media.mw.metropolia.fi/wbma/media/');
  return (
    <List
      style={styles.back}
      dataArray={articles}
      renderRow={(item) => (
        <ArticleListItem style={styles.item} navigation={navigation} singleMedia={item} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  back: {
    backgroundColor: '#c9d4d7',
  },
});

ArticleList.propTypes = {
  navigation: PropTypes.object,
};

export default ArticleList;
