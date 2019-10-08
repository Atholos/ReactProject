import React, { useState, useContext } from 'react';
import ArticleHooks from '../hooks/ArticleHooks';
import { Alert } from 'react-native'



const useSearch = () => {
  const [search, setSearch] = useState({});
  const { reloadAllArticles } = ArticleHooks();

  const handleSearch = (text) => {
    setSearch((search) =>
      ({
        search,
        params: text,
      }));
  };
  const searchFilterFunction = (articles, setArticles) => {
    const setNewData = () => {
      const newData = articles.filter(item => {
        const itemData = `${item.title.toUpperCase()} ${item.description.toUpperCase()}`;
        const textData = search.params.toUpperCase();
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
