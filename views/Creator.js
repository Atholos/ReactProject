import React, { useContext, useEffect, useState } from 'react';
import { Container, Header, Content, Text, Thumbnail, Button, Form, Item, Input, Label } from 'native-base';
import useUploadForm from '../hooks/UploadHooks';
import * as ImagePicker from 'expo-image-picker';
import appHooks from '../hooks/MainHooks';

// const dataUrl = 'http://media.mw.metropolia.fi/wbma/media';
// const idUrl = 'http://media.mw.metropolia.fi/wbma/media/';
// const picLink = 'http://media.mw.metropolia.fi/wbma/uploads/';
// const mediaArray = [];


const Creator = (props) => {
  const [image, setImage] = useState({});
  // const [media, setMedia] = useContext(AppContext);
  const {
    getPermissionAsync,
  } = appHooks();
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
          square
          large
          source={{ uri: image.selected }} />
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
              // handleUpload(image.selected).then(
              //   props.navigation.navigate('Home')
            }}>
              <Text>Upload</Text>
            </Button>
          </Item>
          <Item>
            <Button
              onPress={() => {
                clearForm();
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

export default Creator;
