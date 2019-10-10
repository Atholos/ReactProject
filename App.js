import React, {useState, useEffect} from 'react';
/* eslint-disable max-len */
import {AppProvider} from './contexts/AppContext';
import Navigator from './navigators/Navigator';
import * as Expo from 'expo';
import * as Font from 'expo-font';

const App = () => {
  const [fontReady, setFontReady] = useState(false);
  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    setFontReady(true);
  };
  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontReady) {
    console.log('Waiting for fonts...');
    return <Expo.AppLoading />;
  }

  return (
    <AppProvider>
      <Navigator></Navigator>
    </AppProvider>
  );
};

export default App;
