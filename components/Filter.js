import React, {useState, useContext} from 'react';
import {Header, Left, Right, Body, Item, Button, Icon, Input, Text} from 'native-base';
import {Image, ImageBackground} from 'react-native';
import useSearch from '../hooks/SearchHooks';
import {AppContext} from '../contexts/AppContext';

const Filter = () => {
  const {setArticles, allArticles} = useContext(AppContext);
  const {searchFilterFunction} = useSearch();

  return (
    <Header searchBar rounded>
      <Item style={{marginLeft: 20, marginRight: 20}}>
        <Icon name="ios-search" />
        <Input
          placeholder="Search"
          onChangeText={(text) => searchFilterFunction(text, setArticles, allArticles)}
        />
        <Icon name="pint" />
      </Item>
    </Header>
  );
};
export default Filter;
