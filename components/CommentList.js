import React from 'react';
import PropTypes from 'prop-types';
import CommentListItem from './CommentListItem';
import {Content, List} from 'native-base';
import ArticleHooks from '../hooks/ArticleHooks';


const CommentList = (props) => {
  const {navigation, fid} = props;
  console.log(fid);

  const {
    getArticleComments,
  } = ArticleHooks();

  const [comments, loading] = getArticleComments(fid);

  return (
    <Content>
      <List
        dataArray={comments}
        renderRow={(item) => (
          <CommentListItem navigation={navigation} singleComment={item} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </Content>

  );
};

CommentList.propTypes = {
  navigation: PropTypes.object,
};

export default CommentList;
