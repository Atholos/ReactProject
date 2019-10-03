import React,{useState, useEffect} from "react";
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
  const [desc, setDesc] = useState({});
  const { navigation, singleMedia } = props;
  const {
    getThumbnail,
    getArticleDesc,
  } = ArticleHooks();

  const tn = getThumbnail(singleMedia.file_id);

  useEffect(() => {
    const gotDesc = getArticleDesc(singleMedia.file_id)
    setDesc(gotDesc);
    console.log('DESC SETATTU', desc.tag)
  }
  , []);
  return (
    <ListItem thumbnail>
<<<<<<< HEAD
      <Left>
        <Thumbnail
          square
          large
          source={{ uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + tn.w160 }}
        />
      </Left>
      <Body>
        <Text>{singleMedia.title}</Text>
        <Text note numberOfLines={1}>
        {desc.tag}
        </Text>
      </Body>
       <Right>
        <Button Primary
          onPress={() => {
            navigation.push("Article", { file: singleMedia });
          }}
        >
          <Text >View</Text>
        </Button>
      </Right>
=======
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
>>>>>>> 27ac76abf9985437835da3bf238416a263be846e
    </ListItem>
  );
};

ArticleListItem.propTypes = {
  singleMedia: PropTypes.object
};

export default ArticleListItem;
