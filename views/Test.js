/* eslint-disable max-len */
import React from 'react';
import {Container, Content, Text, Button} from 'native-base';

const Test = (props) => {
  return (
    <Container>
      <Content>
        <Text>This is Main page</Text>
        <Button onPress={() =>
        {props.navigation.push('Creator')}}>
          <Text>Creator</Text>
        </Button>
        <Button onPress={() =>
        {props.navigation.push('Main')}}>
          <Text>Main Page</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default Test;
