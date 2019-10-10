import React, { useContext } from 'react';
import { Alert } from 'react-native';
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
import { AppContext } from '../contexts/AppContext'

const CommentForm = (props) => {
  const { fid, navigation } = props;

  // const {updateEmailValidate} = appValidation();
  const {
    inputs,
    handleCommentChange,
  } = useLogRegForm();
  const { postComment } = appHooks();
  const { reloadArticleComments } = ArticleHooks();
  const { setMyComments } = useContext(AppContext);

  return (
    <Container>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Comment</Label>
            <Input
              autoCapitalize="none"
              placeholder="Write your comment here!"
              onChangeText={handleCommentChange}
              value={inputs.comment} required
            />
          </Item>
          <Item>
            <Button onPress={() => {
              postComment(fid, inputs.comment).then(() => reloadArticleComments(fid,setMyComments))
            }}>
                <Text>Post comment</Text>
            </Button>
          </Item>
        </Form>
      </Content>
    </Container>
  );
};
export default CommentForm;
