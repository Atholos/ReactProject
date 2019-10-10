import React from 'react';
import {StatusBar} from 'react-native';
import {
  Container,
} from 'native-base';


const StatusBarCust = () => {
  return (
    <Container>
      <StatusBar barStyle="light-content" translucent={true} />
    </Container>
  );
};
export default StatusBarCust;
