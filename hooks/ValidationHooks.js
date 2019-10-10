import React, { useState } from 'react';
import validate from 'validate.js';
import LoginValidation from '../validations/LoginValidation';
import RegisterValidation from '../validations/RegisterValidation';
import UploadValidation from '../validations/UploadValidation'
import ArticleHooks from './ArticleHooks'
import appHooks from './MainHooks';
import useUploadForm from './UploadHooks';
import useUpdateForm from './UpdateHooks';


const appValidation = () => {
  const { register, signIn } = appHooks();
  const { avatarUpload, handleUpload, clearForm } = useUploadForm();
  const { reloadAllArticles, reloadMyArticles } = ArticleHooks();
  const {handleUpdate} = useUpdateForm();

  const updatePasswordValidate = async (inputs) => {
    const { updateInfo } = appHooks();
    console.log('updatePasswordValidate');
    const constraints = RegisterValidation;
    const passwordError = validate({ password: inputs.password }, constraints);
    const passconfError = validate({ password: inputs.password, confirmPassword: inputs.cpw }, constraints);
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
    const { updateInfo } = appHooks();
    console.log('updateEmailValidate');
    const constraints = RegisterValidation;
    const emailError = validate({ email: inputs.email }, constraints);
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
    const emailError = validate({ email: inputs.email }, constraints);
    const passwordError = validate({ password: inputs.password }, constraints);
    const passconfError = validate({ password: inputs.password, confirmPassword: inputs.cpw }, constraints);
    const usernameError = validate({ username: inputs.username }, constraints);
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
  const uploadValidate = ( file, upload, navigation, setAllArticles, setArticles, setMyArticles) => {
    const constraints = UploadValidation;
    const titleError = validate({ title: upload.title }, constraints);
    const descError = validate(
      { description: upload.body },
      constraints
    );
    const bodyError = validate({ body: upload.desc }, constraints);
    const fileError = validate({ file: file }, constraints);

    if (!titleError.title && !descError.description && !bodyError.body && !fileError.file) {
      handleUpload(file, upload).then(() => {
        setTimeout(() => {
          reloadAllArticles().then((json) => {
            setArticles(json);
            setAllArticles(json);
          });
          reloadMyArticles().then((json) => {
            setMyArticles(json);
          });
          navigation.navigate('Main');
        }, 2000);
      });
    } else {
      const errorArray = [titleError.title, descError.description, bodyError.body];
      for (let i = 0; i < errorArray.length; i++) {
        if (errorArray[i]) {
          console.log('alert:', errorArray[i][0]);
          alert(errorArray[i][0]);
        }
      }
    }
  };

  const updateValidate = ( file, fileID, update, navigation, setAllArticles, setArticles, setMyArticles) => {
    const constraints = UploadValidation;
    const titleError = validate({ title: update.title }, constraints);
    const bodyError = validate({ body: update.body }, constraints);
    console.log('file', file);
    console.log('update', update);
    if (!titleError.title && !bodyError.body) {
      const data = {
        title: update.title,
        description: update.body,
        }
      handleUpdate(data,fileID).then(() => {
        setTimeout(() => {
          reloadAllArticles().then((json) => {
            setArticles(json);
            setAllArticles(json);
          });
          reloadMyArticles().then((json) => {
            setMyArticles(json);
          });
          navigation.navigate('Main');
        }, 2000);
      });
    } else {
      const errorArray = [titleError.title, bodyError.body];
      for (let i = 0; i < errorArray.length; i++) {
        if (errorArray[i]) {
          console.log('alert:', errorArray[i][0]);
          alert(errorArray[i][0]);
        }
      }
    }
  };
  return {
    loginValidate,
    registerValidate,
    updatePasswordValidate,
    updateEmailValidate,
    uploadValidate,
    updateValidate,
  };
};
export default appValidation;
