import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, Image, Alert} from 'react-native';
import {Container, Content, Button, Text, Header, Tab, Tabs, Input, Thumbnail} from 'native-base';
import appHooks from '../hooks/MainHooks';
import ArticleHooks from '../hooks/ArticleHooks';
import {AppContext} from '../contexts/AppContext';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
import useUpdateForm from '../hooks/UpdateHooks';
import appValidation from '../hooks/ValidationHooks';


const MyArticleEdit = (props) => {
  const {setArticles, setMyArticles, setAllArticles } = useContext(AppContext);
  const {checkUser, getPermissionAsync} = appHooks();
  const {navigation} = props;
  const {deleteArticle} = ArticleHooks();
  const media = navigation.getParam('file', 'WRONG');
  const mediaDesc = navigation.getParam('filedesc', 'WRONG');
  const title = media.title;
  const fileID = media.file_id;
  const [uname, setUname] = useState({});
  const [image, setImage] = useState({selected: 'http://media.mw.metropolia.fi/wbma/uploads/' + media.filename});
  const {
    handleTitleChange,
    handleBodyChange,
    handleUpdate,
    update,
  } = useUpdateForm();
  const { updateValidate } = appValidation();

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
  useEffect(() => {
    console.log('Articlemedia!!!', media);
    checkUser(props).then((json) => {
      setUname({name: json});
    }).catch((error) => {
      console.log(error);x
    });
  }, []);
    return (
      <Content>
        <Input 
        autoCapitalize='none'
        placeholder={title}
        onChangeText={handleTitleChange}
        value={update.title}
        style={styles.title}>
        </Input>
        <Text style ={styles.desc}>{mediaDesc}</Text>
        <Input 
        autoCapitalize='none'
        placeholder={media.description}
        onChangeText={handleBodyChange}
        value={update.body}
        style ={styles.bodytext}>
        </Input>
        <Button
          onPress={
            () => {
              console.log('press');
  
              Alert.alert(
                  'EDIT',
                  'You are updating this Article, press "OK" to proceed or "Cancel" to retract.',
                  [
                    {
                      text: 'OK',
                      onPress: () => {
                        console.log('OK Pressed'),
                        updateValidate('http://media.mw.metropolia.fi/wbma/media/'+fileID, update, navigation, setAllArticles, setArticles, setMyArticles);
                      },
                    },
                    {text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel'},
                  ],
                  {cancelable: false},
              );
            }
          }
        >
          <Text>Edit</Text>
        </Button>
        <Button
          onPress={
            () => {
              console.log('press');
  
              Alert.alert(
                  'DELETE',
                  'You are deleting this file for good, press "OK" to proceed or "Cancel" to retract.',
                  [
                    {
                      text: 'OK',
                      onPress: () => {
                        console.log('OK Pressed'),
                        deleteArticle(media, setMyArticles, setArticles, navigation);
                      },
                    },
                    {text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel'},
                  ],
                  {cancelable: false},
              );
            }
          }
        >
          <Text>Delete</Text>
        </Button>
        </Content>
    )};
    
    MyArticleEdit.propTypes = {
        navigation: PropTypes.object,
      };
  
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 40,
    },
    image: {
      borderRadius: 16,
      height: 250,
      width: '100%',
      marginBottom: 10,
    },
    title: {
      fontSize: 32,
      fontWeight: '600',
      marginBottom: 30,
    },
    desc: {
      marginBottom: 30,
      fontWeight: '500',
    },
    bodytext: {
    },
  });

  export default MyArticleEdit;