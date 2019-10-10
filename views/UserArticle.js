import React from 'react';
import {Container, Tab, Tabs} from 'native-base';
import MyArticleView from '../components/MyArticleView';
import MyArticleEdit from '../components/MyArticleEdit';

const UserArticle = (props) => {
  const {navigation} = props;

  return (
    <Container>
      <Tabs>
        <Tab activeTextStyle={{color: 'white'}} textStyle={{color: 'white'}} tabStyle={{backgroundColor: '#7a7476'}} activeTabStyle={{backgroundColor: '#7a7476'}} heading="View">
          <MyArticleView navigation={navigation} />
        </Tab>
        <Tab activeTextStyle={{color: 'white'}} textStyle={{color: 'white'}} tabStyle={{backgroundColor: '#7a7476'}} activeTabStyle={{backgroundColor: '#7a7476'}} heading="Edit">
          <MyArticleEdit navigation={navigation} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default UserArticle;
