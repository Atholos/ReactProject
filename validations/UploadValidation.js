const UploadValidation = {
  title: {
    presence: {
      message: '^Remember, every great book has a Title',
    },
    length: {
      minimum: 5,
      message: '^Title must be atleast 5 characters',
    },
  },
  description: {
    presence: {
      message: '^You must give a description for your article, how is anyone gonna find it otherwise?',
    },
    length: {
      minimum: 30,
      message: '^Description must be atleast 30 characters, because that is how we roll',
    },
  },
  body: {
    presence: {
      message: '^You are writing an article here!',
    },
    length:{
    minimum: 30,
    message: '^Come on dont be lazy, at least 30 letters..!'
    },
  },
  file: {
    presence: {
      message: 'remember to upload a picture to go alongside with your article'
    },
  }
};
export default UploadValidation;
