import React, {useState} from 'react';
import PropTypes from 'prop-types';

const AppContext = React.createContext({});
const AppProvider = (props) => {
  const {
    articles: initialArticle,
    user: initialUser,
    myArticles: initialMyArticle,
    children,
  } = props;
  const [articles, setArticles] = useState(initialArticle);
  const [user, setUser] = useState(initialUser);
  const [myArticles, setMyArticles] = useState(initialMyArticle);

  const applicationContext = {
    user,
    setUser,
    articles,
    setArticles,
    myArticles,
    setMyArticles,
  };

  return (
    <AppContext.Provider value={applicationContext}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  articles: PropTypes.array,
  myArticles: PropTypes.array,
  user: PropTypes.object,
  children: PropTypes.node,
};

AppProvider.defaultProps = {
  articles: [],
  myArticles: [],
  user: {},
};

export {appContext, AppProvider};

