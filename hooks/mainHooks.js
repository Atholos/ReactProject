import React, { useEffect } from 'react';
import { AsyncStorage, Alert } from 'react-native';
<<<<<<< HEAD
import useFetch from './FetchHooks';

// MainHooks function was changed to appHooks because its not a constructor thus it cannot start with upper case.
=======
>>>>>>> b6952a581a0f93930a8fc1ac2608c9c4b7187965
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
<<<<<<< HEAD
  // function used to sign in
=======
>>>>>>> b6952a581a0f93930a8fc1ac2608c9c4b7187965
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
<<<<<<< HEAD
    navigation.navigate('User');
  };
  //function for registering a user
=======
    navigation.navigate('App');
  };
>>>>>>> b6952a581a0f93930a8fc1ac2608c9c4b7187965
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
<<<<<<< HEAD
  //function for checking username availability
=======
>>>>>>> b6952a581a0f93930a8fc1ac2608c9c4b7187965
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
<<<<<<< HEAD
export default appHooks;
=======
export default appHooks;
>>>>>>> b6952a581a0f93930a8fc1ac2608c9c4b7187965
