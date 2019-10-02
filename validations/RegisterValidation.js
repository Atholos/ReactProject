const RegisterValidation = {
  email: {
    presence: {
      message: '^Please enter an email address',
    },
    email: {
      message: '^Please enter a valid email address',
    },
  },
  password: {
    presence: {
      message: '^Please enter a password',
    },
    length: {
      minimum: 5,
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
  confirmPassword: {
    equality: 'password',
  },
};

export default RegisterValidation;
