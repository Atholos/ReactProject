import React, { useEffect } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import useFetch from './FetchHooks';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

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
    await AsyncStorage.setItem('user', JSON.stringify(json.user));
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
    console.log(json);
    if (!json.error) {
      return (json);
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

  const getUser = async () => {
    const gotuser = await AsyncStorage.getItem('user');
    return gotuser
  };

  const checkUser = async (props) => {
    // PLACEHOLDER TOKEN!!!!! ! ! ! !
    const {navigation} = props;
    const media = navigation.getParam('file', 'WRONG');
    const uid = media.user_id;
    const gotToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMTksInVzZXJuYW1lIjoiYXNkIiwiZW1haWwiOiJlYmluMTIzQGhvdG1haWwuY29tIiwiZnVsbF9uYW1lIjpudWxsLCJpc19hZG1pbiI6bnVsbCwidGltZV9jcmVhdGVkIjoiMjAxOS0wMS0yNFQxMDoyMzoyOC4wMDBaIiwiaWF0IjoxNTY5NzQ1NzgwLCJleHAiOjE1NzE4MTkzODB9.PN1qLUlFcQGK8Uqf3QMwDNtxFDRZegzVjfRIKsSbEVk';
    const response = await fetch('http://media.mw.metropolia.fi/wbma/users/'+ uid, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': gotToken,
      },
    }).catch((error) => {
      console.error(error);
    });
    const result = await response.json();
    console.log('USEROBJ', result);
    return JSON.stringify(result.username)
  };
  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });
    console.log(result);
    setImage(
      {
        selected: result.uri,
      });
  };

  return {
    bootstrapAsync,
    signIn,
    register,
    userCheck,
    signOut,
    checkUser,
    getUser,
    getPermissionAsync,
    pickImage,
  };
};
export default appHooks;
