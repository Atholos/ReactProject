import React, {useState} from 'react';
import PropTypes from 'prop-types';

const AppContext = React.createContext({});
const AppProvider = (props) => {
  const {
    article: initialArticle,
    user: initialUser,
    myArticle: initialMyArticle,
    children,
  } = props;
  const [article, setArticle] = useState(initialArticle);
  const [user, setUser] = useState(initialUser);
  const [myArticle, setMyArticle] = useState(initialMyArticle);

  const applicationContext = {
    user,
    setUser,
    article,
    setArticle,
    myArticle,
    setMyArticle,
  };

  return (
    <AppContext.Provider value={applicationContext}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  media: PropTypes.array,
  myMedia: PropTypes.array,
  user: PropTypes.object,
  children: PropTypes.node,
};

AppProvider.defaultProps = {
  media: [],
  myMedia: [],
  user: {},
};

export {appContext, AppProvider};

