import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
  Text,
} from 'react-native';
import MainHooks from '../hooks/MainHooks'

const Auth = (props) => {
  const {bootstrapAsync} = MainHooks();
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
