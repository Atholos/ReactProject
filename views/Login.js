/* eslint-disable max-len */
import React from 'react';
import { Container, Header, Tab, Tabs } from 'native-base';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = (props) => {
  return (
    <Container>
      <Header hasTabs />
      <Tabs>
        <Tab heading="Login">
          <LoginForm />
        </Tab>
        <Tab heading="Register">
          <RegisterForm />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Login;
