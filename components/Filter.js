import React, { useState, useContext } from 'react';
import { Header, Left, Right, Body, Item, Button, Icon, Input, Text } from 'native-base'
import { Image, ImageBackground } from 'react-native'
import useSearch from '../hooks/SearchHooks';
import { AppContext } from '../contexts/AppContext'

const Filter = () => {
  const { setArticles, allArticles } = useContext(AppContext);
  const { searchFilterFunction } = useSearch();

  return (
    <Header searchBar rounded>
      <Item>
        <Icon name="ios-search" />
        <Input
          placeholder="Search"
          onChangeText={text => searchFilterFunction(text, setArticles, allArticles)}
          />
        <Icon name="ios-people" />
      </Item>
        <Button transparent small rounded>
          <Text>Search</Text>
        </Button>
    </Header>
  );
};
export default Filter;
