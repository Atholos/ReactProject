/* eslint-disable max-len */
import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  Body,
  Thumbnail,
  CardItem,
  Text,
  Card,
} from 'native-base';
import ArticleHooks from '../hooks/ArticleHooks';
import {AppContext} from '../contexts/AppContext';
import {Image, StyleSheet} from 'react-native';

const MyArticleListItem = (props) => {
  const [desc, setDesc] = useState({});
  const {setArticle, setMyArticle} = useContext(AppContext);
  const {navigation, singleMedia} = props;
  const {getThumbnail, deleteMedia} = ArticleHooks();
  const tn = getThumbnail(singleMedia.file_id);
  return (
    <ListItem style={styles.item} thumbnail onPress={() => {
      navigation.push('UserArticle', {
        file: singleMedia,
        filedesc: desc.text,
      });
    }}>
      <Card style={{flex: 1}}>
        <CardItem>
          <Body>
            <Image source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + singleMedia.thumbnails.w320}} style={{height: 200, width: '100%', flex: 1}}/>
          </Body>
        </CardItem>
        <CardItem>
          <Body>
            <Text style ={styles.title}>{singleMedia.title}</Text>
            <Text style={styles.desc} note numberOfLines={3}>
              {singleMedia.body}
            </Text>
          </Body>
        </CardItem>
      </Card>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '500',
  },
  desc: {
    fontWeight: '500',
  },
  item: {
    marginLeft: 5,
    marginRight: 5,
  },
});

MyArticleListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default MyArticleListItem;
