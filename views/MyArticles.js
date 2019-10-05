/* eslint-disable max-len */
import React from 'react';
import {Container, Content} from 'native-base';
import MyArticleList from '../components/MyArticleList';
import PropTypes from 'prop-types';

const MyArticles = (props) => {
  const {navigation} = props;
  return (
    <Container>
      <Content>
        <MyArticleList navigation={navigation}></MyArticleList>
      </Content>
    </Container>
  );
};

export default MyArticles;
