import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, Image, Alert} from 'react-native';
import {Container, Content, Button, Text, Header, Tab, Tabs, Input, Thumbnail, Icon, Form, Item, Textarea, Label} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
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
  const {setArticles, setMyArticles, setAllArticles} = useContext(AppContext);
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
  const {updateValidate} = appValidation();

  useEffect(() => {
    getPermissionAsync();
    handleTitleChange(media.title);
    handleBodyChange(media.description);
  }
  , []);
  useEffect(() => {
    console.log('Articlemedia!!!', media);
    checkUser(props).then((json) => {
      setUname({name: json});
    }).catch((error) => {
      console.log(error); x;
    });
  }, []);
  return (
    <Content padder>
      <Form>
        <Grid>
          <Col>
            <Item>
              {image.selected && <Thumbnail
                source={{uri: image.selected}} style={{width: '100%', height: 200, alignSelf: 'center'}} />}
            </Item>
            <Item last rounded style={{margin: 10}}>
              <Input
                autoCapitalize='none'
                placeholder={title}
                onChangeText={handleTitleChange}
                value={update.title}
              ></Input>
            </Item>
            <Label>Article</Label>
            <Textarea rowSpan={10} style={{margin: 10}}
              bordered
              rounded
              autoCapitalize='none'
              placeholder={media.description}
              onChangeText={handleBodyChange}
              value={update.body}
            ></Textarea>

            <Row style={{height: 40}}>
              <Col>
                <Button style={{margin: 10}} iconLeft small rounded onPress={
                  (navigation) => {
                    console.log('press');
                    Alert.alert(
                        'DELETE',
                        'You are deleting this file for good, press "OK" to proceed or "Cancel" to retract.',
                        [
                          {
                            text: 'OK',
                            onPress: (navigation) => {
                              console.log('OK Pressed'),
                              deleteArticle(fileID, setMyArticles, setArticles, setAllArticles, navigation);
                            },
                          },
                          {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                        ],
                        {cancelable: false},
                    );
                  }
                }>
                  <Icon name='ios-nuclear' />
                  <Text>DELETE</Text>
                </Button>
              </Col>
              <Col>
                <Button style={{margin: 10}} iconLeft small rounded
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
                                updateValidate(fileID, update, navigation, setAllArticles, setArticles, setMyArticles);
                              },
                            },
                            {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                          ],
                          {cancelable: false},
                      );
                    }
                  }
                >
                  <Icon name='md-refresh-circle' />
                  <Text>UPDATE</Text>
                </Button>
              </Col>
            </Row>
          </Col>
        </Grid>
      </Form>
    </Content>
  );
};

MyArticleEdit.propTypes = {
  navigation: PropTypes.object,
};
export default MyArticleEdit;
