import React, { useState, useContext } from 'react';
import { Header, Left, Right, Body, Item, Button, Icon, Input, Text } from 'native-base'
import { AppContext } from '../contexts/AppContext'
import { Image, ImageBackground } from 'react-native'
import ArticleHooks from '../hooks/ArticleHooks';
import {useSearch} from '../hooks/SearchHooks';

const Filter = () => {
  const { reloadAllArticles } = ArticleHooks();
  const { articles, setArticles } = useContext(AppContext);
  const {search, handleSearch} = useSearch();
  searchFilterFunction = (text) => {
    /*if(text.lenght < 1){
        reloadAllArticles().then((json) => {
          setArticles(json);
        });
      }
    */
    setSearch({ value: text });
    const newData = articles.filter(item => {
      const itemData = `${item.title.toUpperCase()} ${item.description.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setArticles(newData);
  };

  return (
    <Header searchBar rounded>
      <Item>
        <Icon name="ios-search" />
        <Input placeholder="Search" onChangeText={text => searchFilterFunction(text)} value={search.value} />
        <Icon name="ios-people" />
      </Item>
      <Button transparent onPress={text => searchFilterFunction(text)}>
        <Text>Search</Text>
      </Button>
    </Header>
  );
};
export default Filter;
