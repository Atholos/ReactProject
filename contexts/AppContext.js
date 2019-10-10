import React, {useState} from 'react';
import PropTypes from 'prop-types';

const AppContext = React.createContext({});

const AppProvider = (props) => {
  const {
    articles: initialArticle,
    user: initialUser,
    myArticles: initialMyArticle,
    myComments: initialMyComment,
    allArticles: initialAllArticles,
    children,
  } = props;
  const [articles, setArticles] = useState(initialArticle);
  const [user, setUser] = useState(initialUser);
  const [myArticles, setMyArticles] = useState(initialMyArticle);
  const [myComments, setMyComments] = useState(initialMyComment);
  const [allArticles, setAllArticles] = useState(initialAllArticles);

  const applicationContext = {
    user,
    setUser,
    articles,
    setArticles,
    myArticles,
    myComments,
    setMyArticles,
    setMyComments,
    allArticles,
    setAllArticles,
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
  allArticles: PropTypes.array,
  myComments: PropTypes.array,
  children: PropTypes.node,
};

AppProvider.defaultProps = {
  articles: [],
  comments: [],
  myArticles: [],
  allArticles: [],
  user: {},
  myComments: [],
};

export {AppContext, AppProvider};
