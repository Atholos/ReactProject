import React, {useEffect, useState} from 'react';
import useLogRegForm from '../hooks/LogRegHooks';
import appHooks from '../hooks/MainHooks';
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
  Thumbnail,
} from 'native-base';
import * as ImagePicker from 'expo-image-picker';

// Component for Register form that is then imported in Login View as a tab
const RegisterForm = (props) => {
  const {registerValidate} = appValidation();
  const {usernameCheck, getPermissionAsync} = appHooks();
  const dummyURL = '../assets/craftbeer.jpg';
  const {
    inputs,
    handleUsernameChange,
    handlePasswordChange,
    handleConfirmPwChange,
    handleEmailChange,
    handleFullnameChange,
  } = useLogRegForm();
  const [image, setImage] = useState({selected: dummyURL});
 // const craftAvatar = 'https://www.catholicnewsagency.com/images/Beer_Credit_Africa_Studio_Shutterstock_CNA.jpg?w=760';
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });
    console.log(result);
    setImage(
        {
          selected: result.uri,
        });
  };
  useEffect(() => {
    getPermissionAsync();
  }
  , []);
  return (
    <Container>
      <Content>
        <Form>
          <Item>
            <Button onPress={() => pickImage()}>
              <Text>Select Avatar</Text>
            </Button>
          </Item>
          <Item>
            <Thumbnail
              square
              large
              source={{uri: image.selected}} />
          </Item>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input
              autoCapitalize="none"
              placeholder="username"
              onChangeText={handleUsernameChange}
              value={inputs.username} required
              onEndEditing={(evt) => {
                const username = evt.nativeEvent.text;
                console.log(username);
                usernameCheck(username);
              }}
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
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCapitalize="none"
              placeholder="email"
              onChangeText={handleEmailChange}
              value={inputs.email} required
            />
          </Item>
          <Item floatingLabel>
            <Label>Full name</Label>
            <Input
              autoCapitalize="none"
              placeholder="fullname"
              onChangeText={handleFullnameChange}
              value={inputs.fullname} required
            />
          </Item>
          <Item>
            <Button onPress={() => registerValidate(inputs, props, image.selected)}>
              <Text>Register</Text>
            </Button>
          </Item>
        </Form>
      </Content>
    </Container>
  );
};
export default RegisterForm;
