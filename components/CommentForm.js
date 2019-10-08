import React from 'react';
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

const CommentForm = (props) => {
  const {fid} = props;
  // const {updateEmailValidate} = appValidation();
  const {
    inputs,
    handleCommentChange,
  } = useLogRegForm();
  const {postComment} = appHooks();

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
            <Button onPress={() => (postComment(fid, inputs.comment))}>
              <Text>Post comment</Text>
            </Button>
          </Item>
        </Form>
      </Content>
    </Container>
  );
};
export default CommentForm;
