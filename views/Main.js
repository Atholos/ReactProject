/* eslint-disable max-len */
import React from 'react';
import { Container, Content, Header } from 'native-base';
import { StatusBar } from 'react-native';
import ArticleList from '../components/ArticleList';
import PropTypes from 'prop-types';
import Filter from '../components/Filter'

const Main = (props) => {
  const { navigation } = props;
  return (
    <Container>
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
