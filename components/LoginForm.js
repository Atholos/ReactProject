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
import appValidation from '../hooks/ValidationHooks';
import {StyleSheet} from 'react-native';

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
        <Button style={styles.button} onPress={() => loginValidate(inputs, props)}>
          <Text>Login</Text>
        </Button>
      </Form>
    </Content>
  );
};

const styles = StyleSheet.create({
  form: {
    marginLeft: 20,
    marginRight: 40,
    marginTop: 30,
  },
  button: {
    justifyContent: 'center',
    height: 40,
    width: 190,
    marginLeft: '30%',
    marginTop: 25,
  },
  buttonImage: {
    justifyContent: 'center',
    height: 40,
    width: 140,
    marginLeft: 35,
  },
});

export default LoginForm;
