import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, AsyncStorage} from 'react-native';

const Article = (props) => {
  const {navigation} = props;
  const media = navigation.getParam('file', 'WRONG');
  const title = media.title;
  const uid = media.user_id;
  console.log('MEDIA', media)

  const [uname, setUname] = useState({});

  const checkUser = async () => {
    // PLACEHOLDER TOKEN!!!!! ! ! ! !
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
    setUname(
        {
          name: result.username,
        });
  };
  checkUser();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text>{media.description}</Text>
      <Text>{uname.name}</Text>
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
