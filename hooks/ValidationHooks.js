
const appValidation = () => {
  const userCheck = async (uname) => {
    const json = await fetchUser(uname)
    console.log(json);
    if (!json) {
      Alert.alert(
        'Error',
        'Username already taken',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    };
  };
  const registerValidate = async (inputs, props) => {
    const constraints = Validation;
    const emailError = validate({ email: inputs.email }, constraints);
    const passwordError = validate({ password: inputs.password }, constraints);
    const passconfError = validate({ password: inputs.password, confirmPassword: inputs.cpw }, constraints);
    const usernameError = validate({ username: inputs.username }, constraints);

    console.log(emailError.email, passwordError.password, usernameError.username, passconfError.confirmPassword);
    if (!emailError.email && !passwordError.password && !usernameError.username && !passconfError.confirmPassword) {
      register(inputs, props);
      console.log('YES!');
    } else {
      const errorArr = [emailError.email, passwordError.password, usernameError.username, passconfError.confirmPassword];
      for (let i = 0; i < errorArr.length; i++) {
        if (errorArr[i]) {
          alert(errorArr[i]);
        }
      }
    }
  };
  const loginValidate = async (inputs, props) => {
    const constraints = Validation;
    const emailError = validate({ email: inputs.email }, constraints);
    const passwordError = validate({ password: inputs.password }, constraints);
    const passconfError = validate({ password: inputs.password, confirmPassword: inputs.cpw }, constraints);
    const usernameError = validate({ username: inputs.username }, constraints);

    console.log(emailError.email, passwordError.password, usernameError.username, passconfError.confirmPassword);
    if (!emailError.email && !passwordError.password && !usernameError.username && !passconfError.confirmPassword) {
      register(inputs, props);
      console.log('YES!');
    } else {
      const errorArr = [emailError.email, passwordError.password, usernameError.username, passconfError.confirmPassword];
      for (let i = 0; i < errorArr.length; i++) {
        if (errorArr[i]) {
          alert(errorArr[i]);
        }
      }
    }
  };
  return(
    userCheck,
    loginValidate,
    registerValidate,
  );
}
