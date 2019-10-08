/* eslint-disable max-len */
import React, { useContext } from 'react';
import { Container, Content, Header, Left, Body, Right } from 'native-base';
import ArticleList from '../components/ArticleList';
import PropTypes from 'prop-types';
import Filter from '../components/Filter';
import appHooks from '../hooks/MainHooks';
import { StatusBar } from 'react-native'

const Main = (props) => {
  const { navigation } = props;
  const { userToContext } = appHooks();
  userToContext();
  return (
    <Container>
      <StatusBar hidden/>
      <Filter/>
      <Content>
        <ArticleList navigation={navigation}></ArticleList>
      </Content>
    </Container>
  );
};

Main.propTypes = {
  navigation: PropTypes.object,
};

export default Main;
