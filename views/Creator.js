import React, {useContext, useEffect, useState} from 'react';
import {Container, Header, Content, Text, Thumbnail, Button} from 'native-base';
import FormTextInput from '../components/FormTextInput';
import useUploadForm from '../hooks/UploadHooks';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import validate from 'validate.js';

// const dataUrl = 'http://media.mw.metropolia.fi/wbma/media';
// const idUrl = 'http://media.mw.metropolia.fi/wbma/media/';
// const picLink = 'http://media.mw.metropolia.fi/wbma/uploads/';
// const mediaArray = [];


const Creator = (props) => {
  const [image, setImage] = useState({});
  // const [media, setMedia] = useContext(AppContext);

  const {
    upload,
    handleTitleChange,
    handleDescChange,
    handleUpload,
    clearForm,
  } = useUploadForm();

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

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
        <Thumbnail source={{uri: image.selected}}/>
        <Text>Upload</Text>
        <FormTextInput
          autoCapitalize='none'
          placeholder='title'
          onChangeText={handleTitleChange}
          value= {upload.title} required
        />
        <FormTextInput
          autoCapitalize='none'
          placeholder='description'
          onChangeText={handleDescChange}
          value={upload.desc} required
        />
        <Button onPress={() => pickImage()}>
          <Text>Show image</Text>
        </Button>
        <Button onPress={() => {
          handleUpload(image.selected, upload.title, upload.desc);
        // handleUpload(image.selected).then(
        //   props.navigation.navigate('Home')
        }}>
          <Text>Upload</Text>
        </Button>
        <Button
          onPress={() => {
            clearForm();
          }}
        >
          <Text>Reset</Text>
        </Button>

      </Content>
    </Container>
  );
};

export default Creator;
