/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content, Text, Button, Thumbnail} from 'native-base';
import appHooks from '../hooks/MainHooks';
import UpdatePasswordForm from '../components/UpdatePasswordForm';
import UpdateEmailForm from '../components/UpdateEmailForm';
import ArticleHooks from '../hooks/ArticleHooks';

const User = (props) => {
  const {
    signOut,
    getUser,
  } = appHooks();
  const {
    getAvatarTag,
  } = ArticleHooks();

  const [uinfo, setUinfo] = useState({});
  const [avatar, setAvatar] = useState({});

  const togglePassword = () => {
    console.log('toggle');
    if (uinfo.form === 0 || !uinfo.form) {
      setUinfo({form: 1});
    } else {
      setUinfo({form: 0});
    }
  };

  const toggleEmail = () => {
    console.log('toggle');
    if (uinfo.form === 0 || !uinfo.form) {
      setUinfo({form: 2});
    } else {
      setUinfo({form: 0});
    }
  };

  useEffect(() => {
    getUser().then((json) => {
      console.log('USER DATA IN USER.JS', json);
      console.log(uinfo.form);
      const parsedJson = JSON.parse(json);
      const date = parsedJson.time_created.split('T');
      setUinfo(
          {
            name: parsedJson.username,
            email: parsedJson.email,
            doc: date[0],
            id: parsedJson.user_id,
            form: uinfo.form,
          }
      );
    }).catch((error) => {
      console.log(error);
    });
  }, [uinfo.form]);
  getAvatarTag(uinfo.id).then((result) => {
    setAvatar(result);
  });

  return (
    <Container style={styles.container}>
      <Content>
        <Text style={styles.title}>Profile</Text>
        {avatar &&
        <Thumbnail
          square
          large
          source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/'+avatar}} />
        }
        <Text>Welcome {uinfo.name}</Text>
        <Text>Email {uinfo.email}</Text>
        <Text>Member since {uinfo.doc}</Text>
        <Button onPress={() => togglePassword()}>
          <Text>Change password</Text>
        </Button>
        {uinfo.form === 1 && <UpdatePasswordForm />}
        <Button onPress={() => toggleEmail()}>
          <Text>Change email</Text>
        </Button>
        {uinfo.form === 2 && <UpdateEmailForm />}
        <Button onPress={() => signOut(props)}>
          <Text>Logout!</Text>
        </Button>
      </Content>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 20,
  },
});


export default User;
