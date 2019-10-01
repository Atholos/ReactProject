import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
  Text,
} from 'react-native';
import mainHooks from '../hooks/mainHooks'

const Auth = (props) => {
  const {bootstrapAsync} = mainHooks();
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
