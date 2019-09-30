import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';

const bootstrapAsync = async (props) => {
  const getToken = async() => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    console.log('token', userToken);
    props.navigation.navigate(userToken ? 'User' : 'Guest');
  }
  useEffect(() => {
    getToken();
  }, []);
};

const Auth = (props) => {
  bootstrapAsync(props);
  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

export default Auth;
