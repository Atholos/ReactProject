import React, {keyExtractor} from "react";
import PropTypes from "prop-types";
import ArticleListItem from "./ArticleListItem";
import { List, Content } from 'native-base';
import ArticleHooks from '../hooks/ArticleHooks';
import Filter from './Filter'


const ArticleList = (props) => {
  const { navigation } = props;

  const {
    useFetch,
  } = ArticleHooks();

  const [articles, loading] = useFetch('http://media.mw.metropolia.fi/wbma/media/');
  return (
    <List
      dataArray={articles}
      renderRow={(item) => (
        <ArticleListItem navigation={navigation} singleMedia={item} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

ArticleList.propTypes = {
  navigation: PropTypes.object,
};

export default ArticleList;
