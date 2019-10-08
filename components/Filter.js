import React, { useState, useContext } from 'react';
import { Header, Left, Right, Body, Item, Button, Icon, Input, Text } from 'native-base'
import { AppContext } from '../contexts/AppContext'
import { Image, ImageBackground } from 'react-native'

const Filter = () => {
  const { articles, setArticles } = useContext(AppContext);
  const [search, setSearch] = useState({});
  searchFilterFunction = (text) => {
    setSearch({ value: text });
    const newData = articles.filter(item => {
      const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    setArticles([]);
    setArticles(newData);
  };

  return (
    <Header searchBar rounded>
      <Item>
        <Icon name="ios-search" />
        <Input placeholder="Search" onChangeText={text => searchFilterFunction(text)} value={search.value}/>
        <Icon name="ios-people" />
      </Item>
      <Button transparent>
        <Text>Search</Text>
      </Button>
    </Header>
  );
};
export default Filter;
