const LoginValidation = {
  password: {
    presence: {
      message: '^Please enter a password',
    },
    length: {
      minimum: 3,
      message: '^Your password must be at least 5 characters',
    },
  },
  username: {
    presence: {
      message: '^Please enter an username',
    },
    length: {
      minimum: 3,
      message: '^Username must be at least 3 characters',
    },
  },
};
export default LoginValidation;
