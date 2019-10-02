const RegisterForm = () => {
  const {
    inputs,
    handleUsernameChange,
    handlePasswordChange,
    handleConfirmPwChange,
    handleEmailChange,
  } = useSignUpForm();
  return (
    <Content>
      <Text>Register!</Text>
      <Form>
        <Item>
          <FormTextInput
            autoCapitalize="none"
            placeholder="username"
            onChangeText={handleUsernameChange}
            value={inputs.username} required
            onEndEditing={(evt) => {
              const username = evt.nativeEvent.text;
              console.log(username);
              userCheck(username);
            }}
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
        <Item>
          <FormTextInput
            autoCapitalize="none"
            placeholder="password"
            secureTextEntry={true}
            onChangeText={handleConfirmPwChange}
            value={inputs.cpw} required
          />
        </Item>
        <Item>
          <FormTextInput
            autoCapitalize="none"
            placeholder="email"
            onChangeText={handleEmailChange}
            value={inputs.email} required
          />
        </Item>
        <Item>
          <FormTextInput
            autoCapitalize="none"
            placeholder="fullname"
            onChangeText={handleFullnameChange}
            value={inputs.fullname} required
          />
        </Item>
        <Button onPress={() => formValidate(inputs, props)}>
          <Text>Register</Text>
        </Button>
      </Form>
    </Content>
  );
};
