import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import CommentListItem from "./CommentListItem";
import {Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text} from 'native-base';
import ArticleHooks from '../hooks/ArticleHooks';
import {AsyncStorage} from 'react-native';
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";


const CommentList = (props) => {
  const { fid } = props;
  console.log(fid)

  const {
    useFetch,
    getArticleComments,
  } = ArticleHooks();
  const [comment, setComment] = useState({});
  const [articles, loading] = useFetch('http://media.mw.metropolia.fi/wbma/media/');

  useEffect(() => {
    getArticleComments(fid).then((json) => {
      setComment({comment: json});
    }).catch((error) => {
      console.log(console.error);
    });
  }, []);

  return (
    <Content>
      <Text>Tässä on id: {fid}</Text>
      <Text>Kommentti on: {comment.comment}</Text>
    </Content>
    // <List
    //   dataArray={articles}
    //   renderRow={(item) => (
    //     <CommentListItem navigation={navigation} singleMedia={item} />
    //   )}
    //   keyExtractor={(item, index) => index.toString()}
    // />
  );
};

CommentList.propTypes = {
  navigation: PropTypes.object,
};

export default CommentList;
