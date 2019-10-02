const LoginForm = () => {
  const {
    inputs,
    handleUsernameChange,
    handlePasswordChange,
  } = useSignUpForm();
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
};
