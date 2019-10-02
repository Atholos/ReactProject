import React from 'react';
import validate from 'validate.js';
import LoginValidation from '../validations/LoginValidation';
import RegisterValidation from '../validations/RegisterValidation';
import appHooks from './MainHooks';


const appValidation = () => {
  const {register, signIn} = appHooks();
  const registerValidate = async (inputs, props) => {
    const constraints = RegisterValidation;
    const emailError = validate({ email: inputs.email }, constraints);
    const passwordError = validate({ password: inputs.password }, constraints);
    const passconfError = validate({ password: inputs.password, confirmPassword: inputs.cpw }, constraints);
    const usernameError = validate({ username: inputs.username }, constraints);

    console.log(emailError.email, passwordError.password, usernameError.username, passconfError.confirmPassword);
    if (!emailError.email && !passwordError.password && !usernameError.username && !passconfError.confirmPassword) {
      register(inputs, props);
      console.log('Registered Succesfully');
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
    const constraints = LoginValidation;
    const passwordError = validate({ password: inputs.password }, constraints);
    const usernameError = validate({ username: inputs.username }, constraints);

    console.log(passwordError.password, usernameError.username);
    if (!passwordError.password && !usernameError.username) {
      signIn(inputs, props);
      console.log('Logged in succesfully');
    } else {
      const errorArr = [passwordError.password, usernameError.username];
      for (let i = 0; i < errorArr.length; i++) {
        if (errorArr[i]) {
          alert(errorArr[i]);
        }
      }
    }
  };
  return {
    loginValidate,
    registerValidate,
  };
}
export default appValidation;
