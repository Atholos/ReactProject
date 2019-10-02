import React from "react";
import PropTypes from "prop-types";
import {
  ArticleListItem as BaseListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Button,
  Text,
} from "native-base";
import ArticleHooks from "../hooks/ArticleHooks";


const ArticleListItem = (props) => {
  const { navigation, singleMedia } = props;
  const {
    getThumbnail,
  } = ArticleHooks();

  const tn = getThumbnail(singleMedia.file_id);
  return (
    <BaseListItem thumbnail>
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
          {singleMedia.description}
        </Text>
      </Body>
{/*       <Right>
        <Button Primary
          onPress={() => {
            navigation.push("Single", { file: singleMedia });
          }}
        >
          <Text >View</Text>
        </Button>
      </Right> */}
    </BaseListItem>
  );
};

ArticleListItem.propTypes = {
  singleMedia: PropTypes.object
};

export default ArticleListItem;
