import React, { useContext, useEffect, useState } from 'react';
import { Container, Header, Content, Text, Thumbnail, Button, Form, Item, Input, Label } from 'native-base';
import PropTypes from 'prop-types';
import useUploadForm from '../hooks/UploadHooks';
import * as ImagePicker from 'expo-image-picker';
import appHooks from '../hooks/MainHooks';
import ArticleHooks from '../hooks/ArticleHooks';
import { AppContext } from '../contexts/AppContext';


// const dataUrl = 'http://media.mw.metropolia.fi/wbma/media';
// const idUrl = 'http://media.mw.metropolia.fi/wbma/media/';
// const picLink = 'http://media.mw.metropolia.fi/wbma/uploads/';
// const mediaArray = [];


const UploadArticle = (props) => {
  const [image, setImage] = useState({});
  const { articles, setArticles, myArticles, setMyArticles } = useContext(AppContext);
  const {
    getPermissionAsync,
  } = appHooks();
  const { reloadAllArticles, reloadMyArticles } = ArticleHooks();

  const {
    upload,
    handleTitleChange,
    handleDescChange,
    handleBodyChange,
    handleUpload,
    clearForm,
  } = useUploadForm();


  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });
    console.log(result);
    setImage(
      {
        selected: result.uri,
      });
  };

  useEffect(() => {
    getPermissionAsync();
  }
    , []);

  return (
    <Container>
      <Header />
      <Content>
        <Thumbnail
          source={{ uri: image.selected }} style={{ width: '100%', height: 200, alignSelf: 'center' }} />
        <Form>
          <Item floatingLabel>
            <Label>Title </Label>
            <Input
              autoCapitalize='none'
              placeholder='Title'
              onChangeText={handleTitleChange}
              value={upload.title} required
            />
          </Item>
          <Item floatingLabel>
            <Label>File Description</Label>
            <Input
              autoCapitalize='none'
              placeholder='Description'
              onChangeText={handleBodyChange}
              value={upload.body} required
            />
          </Item>
          <Item floatingLabel>
            <Label>Article </Label>
            <Input
              autoCapitalize='none'
              placeholder='Article body text'
              onChangeText={handleDescChange}
              value={upload.desc} required
            />
          </Item>
          <Item>
            <Button onPress={() => pickImage()}>
              <Text>Show image</Text>
            </Button>
          </Item>
          <Item>
            <Button onPress={() => {
              handleUpload(image.selected, upload.title, upload.desc);
              clearForm();
              setImage({});
              setArticles([]);
              setTimeout(() => {
                reloadAllArticles().then((json) => {
                  setArticles(json);
                });
                reloadMyArticles().then((json) => {
                  setMyArticles(json);
                });
                props.navigation.navigate('Main');
              }, 2000);
            }}>
              <Text>Upload</Text>
            </Button>
          </Item>
          <Item>
            <Button
              onPress={() => {
                clearForm();
                setImage();
              }}
            >
              <Text>Reset</Text>
            </Button>
          </Item>
        </Form>
      </Content>
    </Container>
  );
};

UploadArticle.propTypes = {
  navigation: PropTypes.object,
};

export default UploadArticle;
