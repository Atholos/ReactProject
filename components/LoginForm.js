import React from 'react';
import FormTextInput from './FormTextInput';
import appHooks from '../hooks/MainHooks';
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
const LoginForm = (props) => {
  const {signIn} = appHooks();
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
        <Button onPress={() => signIn(inputs, props)}>
          <Text>Login</Text>
        </Button>
      </Form>
    </Content>
  );
};
export default LoginForm;
