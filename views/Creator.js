/* eslint-disable max-len */
import React from 'react';
import { Container, Header, Tab, Tabs } from 'native-base';
import UploadArticle from '../components/UploadArticle';
import MyArticleList from '../components/MyArticleList';
import PropTypes from 'prop-types';
//Login has tabs for both login and register
const Creator = (props) => {
  const {navigation} = props;
  return (
    <Container>
      <Header hasTabs/>
      <Tabs>
        <Tab heading="Your Articles">
          <MyArticleList navigation={navigation} />
        </Tab>
        <Tab heading="Create a new Article">
          <UploadArticle navigation={navigation} />
        </Tab>
      </Tabs>
    </Container>
  );
};
Creator.propTypes = {
  navigation: PropTypes.object,
};
export default Creator;
