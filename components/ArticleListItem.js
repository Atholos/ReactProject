import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
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
  Icon,
} from 'native-base';
import {Image} from 'react-native';
import ArticleHooks from '../hooks/ArticleHooks';
import {TouchableOpacity} from 'react-native-gesture-handler';


const ArticleListItem = (props) => {
  const [desc, setDesc] = useState({});
  const {navigation, singleMedia} = props;
  const {
    getThumbnail,
    getArticleDesc,
  } = ArticleHooks();

  const tn = getThumbnail(singleMedia.file_id);

  useEffect(() => {
    getArticleDesc(singleMedia.file_id).then((json) => {
      setDesc({text: json});
    }).catch((error) => {
      console.log(console.error);
    });
  }, []);

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
            {tn &&<Image source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + tn.w320}} style={{height: 200, width: '100%', flex: 1}}/>}
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
      </Card>
    </ListItem>
  );
};

ArticleListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ArticleListItem;
