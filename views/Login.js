/* eslint-disable max-len */
import React from 'react';
import { Container, Header, Tab, Tabs } from 'native-base';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import PropTypes from 'prop-types';

//Login has tabs for both login and register
const Login = (props) => {
  const {navigation} = props;
  return (
    <Container>
      <Header hasTabs />
      <Tabs>
        <Tab heading="Login">
          <LoginForm navigation={navigation} />
        </Tab>
        <Tab heading="Register">
          <RegisterForm navigation={navigation} />
        </Tab>
      </Tabs>
    </Container>
  );
};
Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
