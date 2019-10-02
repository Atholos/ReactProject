import React, { useEffect } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import useFetch from './FetchHooks';

// MainHooks function was changed to appHooks because its not a constructor thus it cannot start with upper case.
const appHooks = () => {
  const bootstrapAsync = async props => {
    const { navigation } = props;
    const getToken = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      // This will switch to the Logged in User screen or Guest screen
      // screen will be unmounted and thrown away.
      console.log('token', userToken);
      navigation.navigate(userToken ? 'User' : 'Guest');
    };
    useEffect(() => {
      getToken();
    }, []);
  };
  // function used to sign in
  const signIn = async (inputs, props) => {
    const { navigation } = props;
    const { fetchPostUrl } = useFetch();
    const data = {
      'username': inputs.username,
      'password': inputs.password,
    };
    const json = await fetchPostUrl('login', data);
    await AsyncStorage.setItem('userToken', json.token);
    // await AsyncStorage.setItem('user', JSON.stringify(json.user));
    navigation.navigate('User');
  };
  //function for registering a user
  const register = async (inputs, props) => {
    const { fetchPostUrl } = useFetch();
    const data = {
      'username': inputs.username,
      'password': inputs.password,
      'email': inputs.email,
      'full_name': inputs.full_name,
    };
    const json = await fetchPostUrl('users', data);
    if (!json.error) {
      signIn(inputs, props);
    }
  };
  //function for checking username availability
  const userCheck = async (uname) => {
    const { checkAvailability } = useFetch();
    const json = await checkAvailability(uname);
    console.log(json);
    if (!json) {
      Alert.alert(
        'Error',
        'Username already taken',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    };
  };
  //function for user signing out
  const signOut = async (props) => {
    const { navigation } = props;
    await AsyncStorage.clear();
    navigation.navigate('Guest');
  };
  return {
    bootstrapAsync,
    signIn,
    register,
    userCheck,
    signOut,
  };
};
export default appHooks;
