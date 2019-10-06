import React from 'react';
import { Container, Header, Content, ListItem, CheckBox, Text, Body } from 'native-base';
import appContext from '../contexts/AppContext.js'

return (
  <Container>
    <Header />
    <Content>
      <ListItem>
        <CheckBox checked={true} />
        <Body>
          <Text>Daily Stand Up</Text>
        </Body>
      </ListItem>
      <ListItem>
        <CheckBox checked={false} />
        <Body>
          <Text>Discussion with Client</Text>
        </Body>
      </ListItem>
      <ListItem>
        <CheckBox checked={false} color="green"/>
        <Body>
          <Text>Finish list Screen</Text>
        </Body>
      </ListItem>
    </Content>
  </Container>
);
