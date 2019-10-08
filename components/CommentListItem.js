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


const CommentListItem = (props) => {
  const [desc, setDesc] = useState({});
  const {navigation, singleComment} = props;
  console.log('commentlistitem');

  // useEffect(() => {
  //   getArticleDesc(singleMedia.file_id).then((json) => {
  //     setDesc({text: json});
  //   }).catch((error) => {
  //     console.log(console.error);
  //   });
  // }, []);

  return (
    <ListItem>
      <Card style={{flex: 1}}>
        <CardItem>
          <Body>
            <Text>{singleComment.comment}</Text>
          </Body>
        </CardItem>
      </Card>
    </ListItem>
  );
};

CommentListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default CommentListItem;
