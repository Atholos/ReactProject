import React from "react";
import PropTypes from "prop-types";
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
} from "native-base";
import {Image } from 'react-native';
import ArticleHooks from "../hooks/ArticleHooks";
import { TouchableOpacity } from "react-native-gesture-handler";


const ArticleListItem = (props) => {
  const { navigation, singleMedia } = props;
  const {
    getThumbnail,
  } = ArticleHooks();

  const tn = getThumbnail(singleMedia.file_id);
  return (
    <ListItem thumbnail>
        <Card style={{flex: 1}}>
        <TouchableOpacity 
        onPress={() => {
          props.navigation.navigate('Article', {
            thumbnail: URL+props.singleMedia.thumbnails.w160,
            title: props.singleMedia.title,
          });
        }}>
            <CardItem>
              <Body>
                <Image source={{ uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + tn.w160 }} style={{height: 200, width: '100%', flex: 1}}/>
              </Body>
            </CardItem>
            <CardItem>
            <Body>
                  <Text>{singleMedia.title}</Text>
                  <Text note numberOfLines={3}>
                  {singleMedia.description}
                  </Text>
                </Body>
            </CardItem>
            </TouchableOpacity>
          </Card>
    </ListItem>
  );
};

ArticleListItem.propTypes = {
  singleMedia: PropTypes.object
};

export default ArticleListItem;
