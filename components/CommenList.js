import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import CommentListItem from './CommentListItem';
import {Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List} from 'native-base';
import ArticleHooks from '../hooks/ArticleHooks';
import {AsyncStorage} from 'react-native';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';


const CommentList = (props) => {
  const {navigation, fid} = props;
  console.log(fid);

  const {
    useFetch,
    getArticleComments,
  } = ArticleHooks();
  // const [comment, setComment] = useState({});
  // const [comments, loading] = getArticleComments(fid);
  const [comments, loading] = getArticleComments(fid);
  console.log('kommentteja', comments);

  // console.log('comments', comments);

  // useEffect(() => {
  //   getArticleComments(fid).then((json) => {
  //     setComment({comment: json});
  //   }).catch((error) => {
  //     console.log(console.error);
  //   });
  // }, []);

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
