import React from 'react';


const useSearch = () => {
  const searchFilterFunction = ( text, setArticles, allArticles) => {
    const setNewData = () => {
      const newData = allArticles.filter((item) => {
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
  };
};

export default useSearch;
