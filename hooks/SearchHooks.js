import { useState, useContext } from 'react';
import ArticleHooks from '../hooks/ArticleHooks';
import { AppContext } from '../contexts/AppContext'


const useSearch = () => {
  const [search, setSearch] = useState({});
  const { reloadAllArticles } = ArticleHooks();
  const { articles, setArticles } = useContext(AppContext);

  const handleSearch = (text) => {
    setSearch((search) =>
      ({
        search,
        params: text,
      }));
  };
  const searchFilterFunction = () => {
    const setNewData = () => {
      const newData = articles.filter(item => {
        const itemData = `${item.title.toUpperCase()} ${item.description.toUpperCase()}`;
        const textData = search.params.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setArticles(newData);
    }
    setArticles([]);
    reloadAllArticles().then((json) => {
      setArticles(json);
    }).then(()=> {setNewData()});
  };
  return {
    searchFilterFunction,
    handleSearch,
    search,
  };
};

export default useSearch;
