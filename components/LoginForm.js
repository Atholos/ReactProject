import React, { useEffect, useState } from 'react';
import { AsyncStorage, Alert } from "react-native";
import PropTypes from 'prop-types';
import FormTextInput from "../components/FormTextInput";
import useSignUpForm from "../hooks/LoginHooks";
import mediaAPI from '../hooks/ApiHooks';
import validate from 'validate.js';
import Validation from '../validation/Validation';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Body,
  Button,
  Text,
  View,
} from 'native-base';
import useLogRegForm from '../hooks/LogRegHooks';
const LoginForm = () => {
  const {
    inputs,
    handleUsernameChange,
    handlePasswordChange,
  } = useLogRegForm();
  return (
    <Content>
      <Text>Login</Text>
      <Form>
        <Item>
          <FormTextInput
            autoCapitalize="none"
            placeholder="username"
            onChangeText={handleUsernameChange}
            value={inputs.username} required
          />
        </Item>
        <Item>
          <FormTextInput
            autoCapitalize="none"
            placeholder="password"
            secureTextEntry={true}
            onChangeText={handlePasswordChange}
            value={inputs.password} required
          />
        </Item>
        <Button onPress={() => signInAsync(inputs, props)}>
          <Text>Login</Text>
        </Button>
      </Form>
    </Content>
  );
};¨
export default LoginForm;
