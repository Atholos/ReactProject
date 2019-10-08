import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, Image, Alert} from 'react-native';
import {Container, Content, Button, Text} from 'native-base';
import appHooks from '../hooks/MainHooks';
import ArticleHooks from '../hooks/ArticleHooks';
import {AppContext} from '../contexts/AppContext';
import CommentList from '../components/CommenList';


const UserArticle = (props) => {
  const {setArticles, setMyArticles} = useContext(AppContext);
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
    <Container>
      <Content>
        <CommentList fid={fileID} />
        <Text style={styles.title}>{title}</Text>
        <Image style={styles.image} source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + media.filename}} />
        {uname.name &&<Text style={styles.desc}>This article is written by {uname.name}</Text>}
        <Text style ={styles.desc}>{mediaDesc}</Text>
        <Text style ={styles.bodytext}>{media.description}</Text>
        <Button
          onPress={
            () => {
              console.log('press');

              Alert.alert(
                'DELETE',
                'You are deleting this file for good "OK" to proceed or "Cancel" to retract.',
                [
                  {
                    text: 'OK',
                    onPress: () => {console.log('OK Pressed'),
                    deleteArticle(media, setMyArticles, setArticles, navigation);
                  },
                  },
                  {text: 'Cancel',
                   onPress: () => console.log('Cancel Pressed'),
                   style: 'cancel',},
                ],
                {cancelable: false},
              );
            }
          }
        >
          <Text>Delete</Text>
        </Button>
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
  },
  desc: {
    marginBottom: 30,
    fontWeight: '500',
  },
  bodytext: {
  },
});

export default UserArticle;
