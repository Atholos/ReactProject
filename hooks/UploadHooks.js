import {useState} from 'react';

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

  const handleBodyChange = (text) => {
    setUpload((upload) =>
      ({
        ...upload,
        body: text,
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
    formData.append('description', upload.body);
    console.log('formdata', formData);


    // Kuvan uppaaminen
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

    // Tagin bodytext sisältö, käyttää upatin kuvan file iideetä
    const tagDescData = {
      file_id: json.file_id,
      tag: upload.body,
    };

    // Lisätään description tagina
    const tagDesc = await fetch('http://media.mw.metropolia.fi/wbma/tags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': gotToken,
      },
      body: JSON.stringify(tagDescData),
    });
    const tagJson = await tagDesc.json();
    console.log(tagJson);


    // Lisätään kategoria tagina. TEE KATEGORIASTA ITSE VALITTAVA!!

    const tagCatData = {
      file_id: json.file_id,
      tag: 'diyArduino',
    };

    const tagCategory = await fetch('http://media.mw.metropolia.fi/wbma/tags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': gotToken,
      },
      body: JSON.stringify(tagCatData),
    });
    const tagCatJson = await tagCategory.json();
    console.log(tagCatJson);

    const tagProjectData = {
      file_id: json.file_id,
      tag: 'craftersguild',
    };

    const tagProject = await fetch('http://media.mw.metropolia.fi/wbma/tags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': gotToken,
      },
      body: JSON.stringify(tagProjectData),
    });
    const tagProjectJson = await tagProject.json();
    console.log(tagProjectJson);
  };


  const clearForm = () => {
    setUpload('');
  };

  return {
    handleTitleChange,
    handleDescChange,
    handleBodyChange,
    handleUpload,
    upload,
    clearForm,
  };
};

export default useUploadForm;
