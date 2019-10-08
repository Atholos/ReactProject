import {useState} from 'react';

const useLogRegForm = () => {
  const [inputs, setInputs] = useState({});
  const handleUsernameChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        username: text,
      }));
  };
  const handlePasswordChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        password: text,
      }));
  };
  const handleConfirmPwChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        cpw: text,
      }));
  };
  const handleEmailChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        email: text,
      }));
  };
  const handleFullnameChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        full_name: text,
      }));
  };
  const handleCommentChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        comment: text,
      }));
  };
  return {
    handleUsernameChange,
    handlePasswordChange,
    handleEmailChange,
    handleCommentChange,
    handleFullnameChange,
    handleConfirmPwChange,
    inputs,
  };
};


export default useLogRegForm;
