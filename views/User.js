/* eslint-disable max-len */
import React from 'react';
import { Container, Content, Text, Button } from 'native-base';
import appHooks from '../hooks/MainHooks'

const User = (props) => {
  const {signOut} = appHooks();
  return (
    <Container>
      <Content>
        <Text>This is User page</Text>
        <Button onPress={() => signOut(props)}>
          <Text>Logout!</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default User;
