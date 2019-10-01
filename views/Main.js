/* eslint-disable max-len */
import React from 'react';
import {Container, Content, Text, Button} from 'native-base';

const Main = (props) => {
  return (
    <Container>
      <Content>
        <Text>This is Main page</Text>
        <Button onPress={() =>
        {props.navigation.navigate('Creator')}}>
          <Text>Creator</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default Main;
