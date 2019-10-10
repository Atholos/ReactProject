import React, {useState, useContext} from 'react';
import {Header, Left, Right, Body, Item, Button, Icon, Input, Text, Thumbnail} from 'native-base';
import {StyleSheet} from 'react-native';
import useSearch from '../hooks/SearchHooks';
import {AppContext} from '../contexts/AppContext';

const Filter = () => {
  const {setArticles, allArticles} = useContext(AppContext);
  const {searchFilterFunction} = useSearch();

  return (
    <Header searchBar rounded style={styles.header}>
      <Item style={styles.search}>
        <Icon name="ios-search" />
        <Input
          placeholder="Search"
          onChangeText={(text) => searchFilterFunction(text, setArticles, allArticles)}
        />
        <Icon name="pint"/>
      </Item>
    </Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#554a3c',
  },
  search: {
    backgroundColor: 'white',
    marginLeft: 20,
    marginRight: 20,
  },
})

export default Filter;
