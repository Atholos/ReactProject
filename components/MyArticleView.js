import React, {useEffect, useState, useContext} from 'react';
import {Platform, StyleSheet, Image, Alert} from 'react-native';
import {Card, CardItem, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text} from 'native-base';
import appHooks from '../hooks/MainHooks';
import ArticleHooks from '../hooks/ArticleHooks';
import {AppContext} from '../contexts/AppContext';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';


const MyArticleView = (props) => {
  const {setArticles, setMyArticles, setAllArticles} = useContext(AppContext);
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
    <Content style={styles.container}>
      <Card style={styles.card}>
        <CardItem>
          <Body>
            <Text style={styles.title}>{title}</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Body>
            <Image style={styles.image} source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + media.filename}} />
          </Body>
        </CardItem>
      </Card>
      <Card style={styles.card}>
          <CardItem>
            <Text>{media.body}</Text>
          </CardItem>
        </Card>
      <Text style ={styles.bodytext}>{media.description}</Text>
      <CommentList fid={fileID} />
      <CommentForm fid={fileID} navigation={navigation} />
    </Content>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c9d4d7',
  },
  image: {
    borderRadius: 16,
    height: 250,
    width: '95%',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  card: {
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },
  desc: {
    marginBottom: 12,
    fontWeight: '400',
    marginLeft: 15,
    marginRight: 15,
  },
  bodytext: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 15,
    padding: 5,
  },
});

export default MyArticleView;
