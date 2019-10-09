import React, { useState, useContext } from 'react';
import ArticleHooks from '../hooks/ArticleHooks';
import { Alert } from 'react-native'



const useSearch = () => {
  const [search, setSearch] = useState({});

  const handleSearch = (text) => {
    setSearch((search) =>
      ({
        search,
        params: text,
      }));
  };
  const searchFilterFunction = ( text, setArticles, allArticles) => {
    const setNewData = () => {
      const newData = allArticles.filter(item => {
        const itemData = `${item.title.toUpperCase()} ${item.description.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
     setArticles(newData);

    };
    setNewData();
  };
  return {
    searchFilterFunction,
    handleSearch,
    search,
  };
};

export default useSearch;
