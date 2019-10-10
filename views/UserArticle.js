import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, Image, Alert} from 'react-native';
import {Container, Content, Button, Text, Header, Tab, Tabs} from 'native-base';
import appHooks from '../hooks/MainHooks';
import ArticleHooks from '../hooks/ArticleHooks';
import {AppContext} from '../contexts/AppContext';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import MyArticleView from '../components/MyArticleView';
import MyArticleEdit from '../components/MyArticleEdit';

const UserArticle = (props) => {
  const {setArticles, setMyArticles, setAllArticles } = useContext(AppContext);
  const {checkUser} = appHooks();
  const {navigation} = props;
  const {deleteArticle} = ArticleHooks();
  const media = navigation.getParam('file', 'WRONG');
  const mediaDesc = navigation.getParam('filedesc', 'WRONG');
  const title = media.title;
  const fileID = media.file_id;
  const [uname, setUname] = useState({});

  return (
  <Container>
    <Header hasTabs />
    <Tabs>
      <Tab heading="View">
        <MyArticleView navigation={navigation} />
      </Tab>
      <Tab heading="Edit">
        <MyArticleEdit navigation={navigation} />
      </Tab>
    </Tabs>
  </Container>)
  
}

export default UserArticle;
