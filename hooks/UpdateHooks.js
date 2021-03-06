import {useState} from 'react';
import {AsyncStorage} from 'react-native';
import ArticleHooks from './ArticleHooks';

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
  const handleUpdate = async (data, fileID) => {
    const gotToken = await AsyncStorage.getItem('userToken');
    console.log('http://media.mw.metropolia.fi/wbma/media/'+ fileID);
    console.log('updatedata', data);
    const response = await fetch('http://media.mw.metropolia.fi/wbma/media/'+fileID, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': gotToken,
      },
      body: JSON.stringify(data),
    }).catch((error) => {
      console.error(error);
    });
    const result = await response.json();
    console.log('FILE UPDATE INFRO: ', result);
  };
  return {
    handleTitleChange,
    handleBodyChange,
    handleUpdate,
    update,
  };
};

export default useUpdateArticle;
