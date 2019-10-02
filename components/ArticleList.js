import React, {keyExtractor} from "react";
import PropTypes from "prop-types";
import ArticleListItem from "./ArticleListItem";
import { ArticleList as BaseList } from 'native-base';
import ArticleHooks from '../hooks/ArticleHooks';


const ArticleList = (props) => {
  const { navigation } = props;

  const {
    useFetch,
  } = ArticleHooks();

  const [articles, loading] = useFetch('http://media.mw.metropolia.fi/wbma/media/');
  return (
    <BaseList
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