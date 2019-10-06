import React from 'react';
import useLogRegForm from '../hooks/LogRegHooks';
import appValidation from '../hooks/ValidationHooks';
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
        <Form>
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
            <Button onPress={() => updatePasswordValidate(inputs)}>
              <Text>Update password</Text>
            </Button>
          </Item>
        </Form>
      </Content>
    </Container>
  );
};
export default UpdatePasswordForm;
