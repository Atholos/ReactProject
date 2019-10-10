/* eslint-disable max-len */
import React, { useContext } from 'react';
import { Container, Content, Header, Left, Body, Right } from 'native-base';
import ArticleList from '../components/ArticleList';
import PropTypes from 'prop-types';
import Filter from '../components/Filter';
import appHooks from '../hooks/MainHooks';
import {Platform, StatusBar } from 'react-native';
import StatusBarCust from '../components/StatusBarCust';

const Main = (props) => {
  const { navigation } = props;
  const { userToContext } = appHooks();
  userToContext();

  return (
    <Container>
      <StatusBarCust />
      <Filter style={{backgroundColor: '#c9d4d7'}}/>
        <ArticleList navigation={navigation}></ArticleList>
      </Container>
  );
};

Main.propTypes = {
  navigation: PropTypes.object,
};

export default Main;
