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
import appValidation from '../hooks/ValidationHooks'

//Component for Login form that is then imported in Login View as a tab
const LoginForm = (props) => {
  const {loginValidate} = appValidation();
  const {
    inputs,
    handleUsernameChange,
    handlePasswordChange,
  } = useLogRegForm();
  return (
    <Content>
      <Form>
        <Item floatingLabel>
        <Label>Username</Label>
          <Input
            autoCapitalize="none"
            placeholder="username"
            onChangeText={handleUsernameChange}
            value={inputs.username} required
          />
        </Item>
        <Item floatingLabel>
        <Label>Password</Label>
          <Input
            autoCapitalize="none"
            placeholder="password"
            secureTextEntry={true}
            onChangeText={handlePasswordChange}
            value={inputs.password} required
          />
        </Item>
        <Button onPress={() => loginValidate(inputs, props)}>
          <Text>Login</Text>
        </Button>
      </Form>
    </Content>
  );
};
export default LoginForm;
