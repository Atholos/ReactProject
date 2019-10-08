import { useState } from 'react';
import { AsyncStorage} from 'react-native';
import ArticleHooks from './ArticleHooks'

const useSearch = () => {
  const [search, setSearch] = useState({});

  const handleSearch = (text) => {
    setUpload((search) =>
      ({
        search,
        value: text,
      }));
  };
  return {
    handleSearch,
    search
  };
};


  export default SearchHooks;
