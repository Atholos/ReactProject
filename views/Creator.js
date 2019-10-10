/* eslint-disable max-len */
import React from 'react';
import { Container, Header, Tab, Tabs } from 'native-base';
import UploadArticle from '../components/UploadArticle';
import MyArticleList from '../components/MyArticleList';
import PropTypes from 'prop-types';

const Creator = (props) => {
  const {navigation} = props;
  return (
    <Container>
      <Tabs tabContainerStyle={{ height: 60}}>
        <Tab activeTextStyle={{color: 'white'}} textStyle={{color: 'white'}} tabStyle={{backgroundColor: '#7a7476'}} activeTabStyle={{backgroundColor: '#7a7476'}} heading="Your Articles">
          <MyArticleList navigation={navigation} />
        </Tab>
        <Tab activeTextStyle={{color: 'white'}} textStyle={{color: 'white'}} tabStyle={{backgroundColor: '#7a7476'}} activeTabStyle={{backgroundColor: '#7a7476'}} heading="Create a new Article">
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
