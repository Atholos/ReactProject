import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
import mainHooks from '../hooks/mainHooks'

const Auth = (props) => {
  const {bootstrapAsync} = mainHooks();
  bootstrapAsync(props);
  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

export default Auth;
