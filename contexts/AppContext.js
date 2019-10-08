import React, {useState} from 'react';
import PropTypes from 'prop-types';

const AppContext = React.createContext({});

const AppProvider = (props) => {
  const {
    articles: initialArticle,
    user: initialUser,
    myArticles: initialMyArticle,
    myComments: initialMyComment,
    categories: initialCategories,
    children,
  } = props;
  const [articles, setArticles] = useState(initialArticle);
  const [user, setUser] = useState(initialUser);
  const [myArticles, setMyArticles] = useState(initialMyArticle);
  const [myComments, setMyComments] = useState(initialMyArticle);
  const [categories, setCategories] = useState(initialCategories);

  const applicationContext = {
    user,
    setUser,
    articles,
    setArticles,
    myArticles,
    myComments,
    setMyArticles,
    setMyComments,
    categories,
    setCategories,
  };

  return (
    <AppContext.Provider value={applicationContext}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  articles: PropTypes.array,
  comments: PropTypes.array,
  myArticles: PropTypes.array,
  user: PropTypes.object,
  categories: PropTypes.array,
  children: PropTypes.node,
};

AppProvider.defaultProps = {
  articles: [],
  comments: [],
  myArticles: [],
  categories: [],
  user: {},
};

export {AppContext, AppProvider};
