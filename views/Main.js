/* eslint-disable max-len */
import React from 'react';
import {Container, Content} from 'native-base';
import ArticleList from '../components/ArticleList';
import PropTypes from 'prop-types';

const Main = (props) => {
  const {navigation} = props;
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
