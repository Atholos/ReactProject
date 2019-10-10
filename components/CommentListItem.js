import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  Body,
  CardItem,
  Text,
  Card,
} from 'native-base';


const CommentListItem = (props) => {
  const {navigation, singleComment} = props;


  return (
    <ListItem>
      <Card style={{flex: 1}}>
        <CardItem>
          <Body>
            <Text>{singleComment.username}: {singleComment.comment}</Text>
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
