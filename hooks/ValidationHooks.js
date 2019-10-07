import React, {useState} from 'react';
import validate from 'validate.js';
import LoginValidation from '../validations/LoginValidation';
import RegisterValidation from '../validations/RegisterValidation';
import appHooks from './MainHooks';
import useUploadForm from './UploadHooks';


const appValidation = () => {
  const {register, signIn} = appHooks();
  const {avatarUpload} = useUploadForm();

  const updatePasswordValidate = async (inputs) => {
    const {updateInfo} = appHooks();
    console.log('updatePasswordValidate');
    const constraints = RegisterValidation;
    const passwordError = validate({password: inputs.password}, constraints);
    const passconfError = validate({password: inputs.password, confirmPassword: inputs.cpw}, constraints);
    if (!passwordError.password && !passconfError.confirmPassword) {
      console.log('salasana vaihtuu');
      const data = {
        password: inputs.password,
      };
      updateInfo(data);
    } else {
      const errorArr = [passwordError.password, passconfError.confirmPassword];
      for (let i = 0; i < errorArr.length; i++) {
        if (errorArr[i]) {
          alert(errorArr[i]);
        }
      }
    }
  };

  const updateEmailValidate = async (inputs) => {
    const {updateInfo} = appHooks();
    console.log('updateEmailValidate');
    const constraints = RegisterValidation;
    const emailError = validate({email: inputs.email}, constraints);
    if (!emailError.email) {
      const data = {
        email: inputs.email,
      };
      updateInfo(data);
      // alert('Email updated successfully');
    } else {
      alert(emailError.email);
    }
  };

  const registerValidate = async (inputs, props, image) => {
    const constraints = RegisterValidation;
    const emailError = validate({email: inputs.email}, constraints);
    const passwordError = validate({password: inputs.password}, constraints);
    const passconfError = validate({password: inputs.password, confirmPassword: inputs.cpw}, constraints);
    const usernameError = validate({username: inputs.username}, constraints);
    console.log(emailError.email, passwordError.password, usernameError.username, passconfError.confirmPassword);
    if (!emailError.email && !passwordError.password && !usernameError.username && !passconfError.confirmPassword) {
      const uid = await register(inputs, props);
      console.log('IMAGE JA UID', image, uid);
      await avatarUpload(image, uid);
      console.log('Registered Succesfully');
      await signIn(inputs, props);
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
    const passwordError = validate({password: inputs.password}, constraints);
    const usernameError = validate({username: inputs.username}, constraints);

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
    updatePasswordValidate,
    updateEmailValidate,
  };
};
export default appValidation;
