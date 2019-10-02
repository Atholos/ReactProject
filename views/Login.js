/* eslint-disable max-len */
import React from 'react';
import { Container, Content, Text } from 'native-base';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = (props) => {
  return (
    <Container>
      <Header hasTabs />
      <Tabs>
        <Tab heading="Tab1">
          <Tab1 />
        </Tab>
        <Tab heading="Tab2">
          <Tab2 />
        </Tab>
        <Tab heading="Tab3">
          <Tab3 />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Login;
