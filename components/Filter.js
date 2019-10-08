import React, { useState, useContext } from 'react';
import { Header, Left, Right, Body, Item, Button, Icon, Input, Text } from 'native-base'
import { Image, ImageBackground } from 'react-native'
import useSearch from '../hooks/SearchHooks';

const Filter = () => {

  const {handleSearch, searchFilterFunction, search} = useSearch();

  return (
    <Header searchBar rounded>
      {/* <Item>
        <Icon name="ios-search" />
        <Input placeholder="Search" onChangeText={text => handleSearch(text)} value={search.params} />
        <Icon name="ios-people" />
      </Item>
      <Item>
      <Button transparent onPress={() => searchFilterFunction()}>
        <Text>Search</Text>
      </Button>
      </Item>
    </Header>
  );
};
export default Filter;
