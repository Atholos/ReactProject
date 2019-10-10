import React, {useEffect, useState, useContext} from 'react';
import {Platform, StyleSheet, Image, Alert} from 'react-native';
import {Container, Content, Button, Text, Header, Tab, Tabs} from 'native-base';
import appHooks from '../hooks/MainHooks';
import ArticleHooks from '../hooks/ArticleHooks';
import {AppContext} from '../contexts/AppContext';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

const MyArticleView = (props) => {
  const {setArticles, setMyArticles, setAllArticles } = useContext(AppContext);
  const {checkUser} = appHooks();
  const {navigation} = props;
  const {deleteArticle} = ArticleHooks();
  const media = navigation.getParam('file', 'WRONG');
  const mediaDesc = navigation.getParam('filedesc', 'WRONG');
  const title = media.title;
  const fileID = media.file_id;
  const [uname, setUname] = useState({});

  useEffect(() => {
    console.log('Articlemedia!!!', media);
    checkUser(props).then((json) => {
      setUname({name: json});
    }).catch((error) => {
      console.log(error);
    });
  }, []);
    return (
        <Content>
          <Text style={styles.title}>{title}</Text>
          <Image style={styles.image} source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + media.filename}} />
          {uname.name &&<Text style={styles.desc}>This article is written by {uname.name}</Text>}
          <Text style ={styles.desc}>{mediaDesc}</Text>
          <Text style ={styles.bodytext}>{media.description}</Text>
          <CommentList fid={fileID} />
          <CommentForm fid={fileID} />
        </Content>
    );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  image: {
    borderRadius: 16,
    height: 250,
    width: '95%',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
  },
  desc: {
    marginBottom: 12,
    fontWeight: '500',
    marginLeft: 15,
    marginRight: 15,
  },
  bodytext: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 15,
  },
});

export default MyArticleView;
