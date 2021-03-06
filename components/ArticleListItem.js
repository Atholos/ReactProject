import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  Body,
  CardItem,
  Text,
  Card,
} from 'native-base';
import {Image, StyleSheet} from 'react-native';

const ArticleListItem = (props) => {
  const [desc, setDesc] = useState({});
  const {navigation, singleMedia} = props;

  return (

    <ListItem style={styles.item} thumbnail onPress={() => {
      navigation.push('Article', {
        file: singleMedia,
        filedesc: desc.text,
      });
    }}>
      <Card style={styles.card}>
        <CardItem style={styles.imcard}>
          <Body style={styles.image}>
            <Image source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + singleMedia.thumbnails.w320}} style={{height: 200, width: '100%', flex: 1}}/>
          </Body>
        </CardItem>
        <CardItem style={styles.texts}>
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
    marginBottom: 10,
  },
  card: {
    flex: 1,
    borderStyle: 'solid',
    borderColor: '#d5da9b',
    borderWidth: 3,
  },
  imcard: {
    borderStyle: 'solid',
    borderColor: '#e1e5b8',
    borderWidth: 1,
    backgroundColor: '#ce9c8d',
  },
  texts: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#fffff2',
  },
  desc: {
    fontWeight: '500',
  },
  cardItem: {
    backgroundColor: '#65778e'
  },
  item: {
    marginLeft: 5,
    marginRight: 5,
  },
  image: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1/2,
    borderRadius: 16,
    overflow: 'hidden',
  },
});

ArticleListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ArticleListItem;
