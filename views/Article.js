import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, AsyncStorage, ScrollView} from 'react-native';
import {Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text} from 'native-base';
import appHooks from '../hooks/MainHooks';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';


const Article = (props) => {
  const {checkUser} = appHooks();
  const {navigation} = props;
  const media = navigation.getParam('file', 'WRONG');
  // const mediaDesc = navigation.getParam('filedesc', 'WRONG');
  const title = media.title;
  const fileID = media.file_id;

  const [uname, setUname] = useState({});

  useEffect(() => {
    console.log('Articlemedia!!!', media.file_id);
    checkUser(props).then((json) => {
      setUname({name: json});
    }).catch((error) => {
      console.log(error);
    });
  }, []);
  return (
    <Container>
      <Content>
        <Text style={styles.title}>{title}</Text>
        <Image style={styles.image} source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + media.filename}} />
        {uname.name &&<Text style={styles.desc}>This article is written by {uname.name}</Text>}
        <Text style ={styles.desc}>{media.body}</Text>
        <Text style ={styles.bodytext}>{media.description}</Text>
        <CommentList fid={fileID} />
        <CommentForm fid={fileID} navigation={navigation} />
      </Content>
    </Container>
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
    width: '100%',
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
  },
  desc: {
    marginBottom: 30,
    fontWeight: '500',
    marginLeft: 15,
    marginRight: 15,
  },
  bodytext: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 15,
    fontFamily: 'Helvetica',
  },
});

export default Article;
