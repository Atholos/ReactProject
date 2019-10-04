import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, AsyncStorage} from 'react-native';
import appHooks from '../hooks/MainHooks'

const Article = (props) => {
  const {checkUser} = appHooks();
  const {navigation} = props;
  const media = navigation.getParam('file', 'WRONG');
  const title = media.title;

  const [uname, setUname] = useState({});

  useEffect(() => {
    checkUser(props).then((json) => {
        setUname({name: json});
      }).catch((error) => {
        console.log(error);
      });
    }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {uname.name &&<Text>{uname.name}</Text>}
      <Text>{media.description}</Text>
      <Image style={styles.image} source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + media.filename}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  image: {
    flex: 1,
    borderRadius: 16,
    maxHeight: 200,
    width: 200,
  },
  title: {
    fontSize: 40,
    fontWeight: '600',
  },
});

export default Article;
