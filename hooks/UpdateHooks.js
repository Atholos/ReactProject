import { useState } from 'react';
import { AsyncStorage} from 'react-native';
import ArticleHooks from './ArticleHooks'

const useUpdateArticle = () => {
    const [update, setUpdate] = useState({});
    const {reloadMyArticles, reloadAllArticles} = ArticleHooks();

    const handleTitleChange = (text) => {
      setUpdate((update) =>
        ({
          ...update,
          title: text,
        }));
    };

    const handleBodyChange = (text) => {
      setUpdate((update) =>
        ({
          ...update,
          body: text,
        }));
    };
    const handleUpdate = async (file, update) => {
      const gotToken = await AsyncStorage.getItem('userToken');
      const localUri = file;
      const filename = localUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;
      const formData = new FormData();
      formData.append('file', { uri: localUri, name: filename, type });
      formData.append('title', update.title);
      //console.log('formdata', formData);
  
  
      // Kuvan päivitys
      const response = await fetch('http://media.mw.metropolia.fi/wbma/media/' +file.file_id, {
        method: 'PUT',
        headers: {
          'x-access-token': gotToken,
        },
        body: formData,
      });
      const json = await response.json();
      //console.log(json);

  
      clearForm();
    };
    return {
      handleTitleChange,
      handleBodyChange,
      handleUpdate,
      update,
    };
};

export default useUpdateArticle;