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

const UpdateEmailForm = (props) => {
  const {updateEmailValidate} = appValidation();
  const {
    inputs,
    handleEmailChange,
  } = useLogRegForm();

  return (
    <Container>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCapitalize="none"
              placeholder="New email"
              onChangeText={handleEmailChange}
              value={inputs.email} required
            />
          </Item>
          <Item>
            <Button onPress={() => updateEmailValidate(inputs)}>
              <Text>Update email</Text>
            </Button>
          </Item>
        </Form>
      </Content>
    </Container>
  );
};
export default UpdateEmailForm;

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
