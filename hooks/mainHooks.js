import React, {useEffect} from "react";
import { AsyncStorage } from "react-native";

const MainHooks = () => {
  const bootstrapAsync = async props => {
    const { navigation } = props;
    const getToken = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      // This will switch to the Logged in User screen or Guest screen
      // screen will be unmounted and thrown away.
      console.log("token", userToken);
      navigation.navigate(userToken ? "User" : "Guest");
    };
    useEffect(() => {
      getToken();
    }, []);
  };
  return {
    bootstrapAsync,
  };
};
export default MainHooks;
