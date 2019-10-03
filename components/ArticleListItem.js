import React,{useState, useEffect} from "react";
import PropTypes from "prop-types";
import {
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Button,
  Text,
} from "native-base";
import ArticleHooks from "../hooks/ArticleHooks";


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
    </ListItem>
  );
};

ArticleListItem.propTypes = {
  singleMedia: PropTypes.object
};

export default ArticleListItem;
