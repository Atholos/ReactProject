/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import { Container, Content, Text, Button } from 'native-base';
import appHooks from '../hooks/MainHooks'

const User = (props) => {
  const {
        signOut,
        getUser
      } = appHooks();

  const [uinfo, setUinfo] = useState({});

  useEffect(() => {
    getUser().then((json) => {
      console.log('USER DATA IN USER.JS', json)
      const parsedJson = JSON.parse(json)
        setUinfo(
          {
          name: parsedJson.username,
          email: parsedJson.email,
          doc: parsedJson.time_created
        }
        );
      }).catch((error) => {
        console.log(error);
      });
    }, []);


  return (
    <Container style={styles.container}>
      <Content>
        <Text style={styles.title}>Profile</Text>
        <Text>Welcome {uinfo.name}</Text>
        <Text>Email {uinfo.email}</Text>
        <Text>Member since {uinfo.doc}</Text>
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
