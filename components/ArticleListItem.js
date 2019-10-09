import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  Body,
  CardItem,
  Text,
  Card,
} from 'native-base';
import {Image} from 'react-native';
import ArticleHooks from '../hooks/ArticleHooks';


const ArticleListItem = (props) => {
  const [desc, setDesc] = useState({});
  const {navigation, singleMedia} = props;
  const {
    getThumbnail,
    getArticleDesc,
  } = ArticleHooks();

  // useEffect(() => {
  //   getArticleDesc(singleMedia.file_id).then((json) => {
  //     setDesc({text: json});
  //   }).catch((error) => {
  //     console.log(console.error);
  //   });
  // }, []);

  return (

    <ListItem thumbnail onPress={() => {
      navigation.push('Article', {
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
            <Text>{singleMedia.title}</Text>
            <Text note numberOfLines={3}>
              {singleMedia.body}
            </Text>
          </Body>
        </CardItem>
      </Card>
    </ListItem>
  );
};

ArticleListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ArticleListItem;
