import {useState} from 'react';
import {AsyncStorage} from 'react-native';

const useUploadForm = () => {
  const [upload, setUpload] = useState({});

  const handleTitleChange = (text) => {
    setUpload((upload) =>
      ({
        ...upload,
        title: text,
      }));
  };
  const handleDescChange = (text) => {
    setUpload((upload) =>
      ({
        ...upload,
        desc: text,
      }));
  };

  const handleUpload = async (file) => {
    // const gotToken = await AsyncStorage.getItem('userToken');
    const gotToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMTksInVzZXJuYW1lIjoiYXNkIiwiZW1haWwiOiJlYmluMTIzQGhvdG1haWwuY29tIiwiZnVsbF9uYW1lIjpudWxsLCJpc19hZG1pbiI6bnVsbCwidGltZV9jcmVhdGVkIjoiMjAxOS0wMS0yNFQxMDoyMzoyOC4wMDBaIiwiaWF0IjoxNTY5NzQ1NzgwLCJleHAiOjE1NzE4MTkzODB9.PN1qLUlFcQGK8Uqf3QMwDNtxFDRZegzVjfRIKsSbEVk';
    const localUri = file;
    const filename = localUri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;
    const formData = new FormData();
    formData.append('file', {uri: localUri, name: filename, type});
    formData.append('title', upload.title);
    formData.append('description', upload.desc);
    console.log('formdata', formData);

    const response = await fetch('http://media.mw.metropolia.fi/wbma/media', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-access-token': gotToken,
      },
      body: formData,
    });
    const json = await response.json();
    console.log(json);

    // TÄNNE
  };

  const clearForm = () => {
    setUpload("");
  };

  // const handleFormChange = (form) => {
  //   setInputs((inputs) =>
  //     ({
  //       ...inputs,
  //       form: form,
  //     }));
  // };
  return {
    handleTitleChange,
    handleDescChange,
    handleUpload,
    upload,
    clearForm,
  };
};


export default useUploadForm;
