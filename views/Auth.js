import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
  Text,
} from 'react-native';
import appHooks from '../hooks/MainHooks';

const Auth = (props) => {
  const {bootstrapAsync} = appHooks();
  bootstrapAsync(props);
  return (
    <View>
      <ActivityIndicator />
      <Text>Log in here!!!</Text>
      <StatusBar barStyle="default" />
    </View>
  );
};

export default Auth;
