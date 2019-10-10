import React from 'react';
import useLogRegForm from '../hooks/LogRegHooks';
import appValidation from '../hooks/ValidationHooks';
import {StyleSheet} from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
} from 'native-base';

const UpdatePasswordForm = (props) => {
  const {updatePasswordValidate} = appValidation();
  const {
    inputs,
    handlePasswordChange,
    handleConfirmPwChange,
  } = useLogRegForm();

  return (
    <Container>
      <Content>
        <Form style={styles.form}>
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
          <Item floatingLabel>
            <Label>Confirm Password</Label>
            <Input
              autoCapitalize="none"
              placeholder="password"
              secureTextEntry={true}
              onChangeText={handleConfirmPwChange}
              value={inputs.cpw} required
            />
          </Item>
          <Item>
            <Button style={styles.button} onPress={() => updatePasswordValidate(inputs)}>
              <Text>Update password</Text>
            </Button>
          </Item>
        </Form>
      </Content>
    </Container>
  );
};
export default UpdatePasswordForm;

const styles = StyleSheet.create({
  form: {
    marginLeft: 20,
    marginRight: 40,
    marginTop: 30,
  },
  button: {
    backgroundColor: 'green',
    height: 40,
    width: 150,
    marginTop: 30,
  },
});
