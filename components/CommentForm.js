import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import useLogRegForm from '../hooks/LogRegHooks';
import appHooks from '../hooks/MainHooks';

// import appValidation from '../hooks/ValidationHooks';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
} from 'native-base';
import ArticleHooks from '../hooks/ArticleHooks';
import {AppContext} from '../contexts/AppContext';

const CommentForm = (props) => {
  const {fid, navigation} = props;

  // const {updateEmailValidate} = appValidation();
  const {
    inputs,
    handleCommentChange,
  } = useLogRegForm();
  const {postComment} = appHooks();
  const {reloadArticleComments} = ArticleHooks();
  const {setMyComments} = useContext(AppContext);

  return (
    <Container>
      <Content style={styles.form}>
          <Item>
            <Input
              autoCapitalize="none"
              placeholder="Write your comment here!"
              onChangeText={handleCommentChange}
              value={inputs.comment} required
            />
          </Item>
            <Button style={styles.button} onPress={() => {
              postComment(fid, inputs.comment).then(() => reloadArticleComments(fid, setMyComments));
            }}>
              <Text>Post comment</Text>
            </Button>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  form: {
    marginLeft: 20,
    marginRight: 40,
    marginTop: 30,
  },
  button: {
    backgroundColor: 'green',
    height: 40,
    width: 150,
    marginTop: 30,
  },
});

export default CommentForm;
