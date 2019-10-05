/* eslint-disable max-len */
import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'react-native';
import {
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  CardItem,
  Text,
  Card,
  Header,
  Button,
  Icon
} from 'native-base';
import ArticleHooks from '../hooks/ArticleHooks';
import {MediaContext} from '../contexts/MediaContext';
import { AppContext } from '../contexts/AppContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Image } from 'react-native';

const MyArticleListItem = (props) => {
  const [desc, setDesc] = useState({});
  const {setArticle, setMyArticle} = useContext(AppContext);
  const {navigation, singleMedia} = props;
  const {getThumbnail, deleteMedia} = ArticleHooks();
  const tn = getThumbnail(singleMedia.file_id);
  console.log('thumbnails', tn);
  return (
    <ListItem thumbnail>
      <Card style={{flex: 1}}>
        <TouchableOpacity
        onPress={() => {navigation.push("Article", {
          file: singleMedia,
          filedesc: desc.text,
         });
        }}>
            <CardItem>
              <Body>
                <Image source={{ uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + tn.w320 }} style={{height: 200, width: '100%', flex: 1}}/>
              </Body>
            </CardItem>
            <CardItem>
            <Body>
                  <Text>{singleMedia.title}</Text>
                  <Text note numberOfLines={3}>
                  {desc.text}
                  </Text>
                </Body>
            </CardItem>
            </TouchableOpacity>
          </Card>
    </ListItem>
  );
};

MyArticleListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default MyArticleListItem;
