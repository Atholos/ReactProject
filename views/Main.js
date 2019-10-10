/* eslint-disable max-len */
import React from 'react';
import {Container} from 'native-base';
import ArticleList from '../components/ArticleList';
import PropTypes from 'prop-types';
import Filter from '../components/Filter';
import appHooks from '../hooks/MainHooks';

import StatusBarCust from '../components/StatusBarCust';

const Main = (props) => {
  const {navigation} = props;
  const {userToContext} = appHooks();
  userToContext();

  return (
    <Container>
      <StatusBarCust />
      <Filter/>
      <ArticleList navigation={navigation}></ArticleList>
    </Container>
  );
};

Main.propTypes = {
  navigation: PropTypes.object,
};

export default Main;
