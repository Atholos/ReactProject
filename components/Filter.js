import React, {useState, useContext} from 'react';
import {Header, Left, Right, Body, Item, Button, Icon, Input, Text} from 'native-base';
import {StyleSheet} from 'react-native';
import useSearch from '../hooks/SearchHooks';
import {AppContext} from '../contexts/AppContext';

const Filter = () => {
  const {setArticles, allArticles} = useContext(AppContext);
  const {searchFilterFunction} = useSearch();

  return (
    <Header iosBarStyle='light-content' searchBar rounded style={styles.header}>
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
    backgroundColor: '#7a7476',
  },
  search: {
    backgroundColor: '#fffff2',
    marginLeft: 20,
    marginRight: 20,
  },
})

export default Filter;
