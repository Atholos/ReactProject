import {useEffect, useContext, useState} from 'react';
import {AsyncStorage, Alert} from 'react-native';
import {AppContext} from '../contexts/AppContext';
import appHooks from '../hooks/MainHooks';


const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

const fetchGetUrl = async (url) => {
  // PLACEHOLDER token. TEE KUNNOLLA !!!!! !!!    !
  const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMTksInVzZXJuYW1lIjoiYXNkIiwiZW1haWwiOiJlYmluMTIzQGhvdG1haWwuY29tIiwiZnVsbF9uYW1lIjpudWxsLCJpc19hZG1pbiI6bnVsbCwidGltZV9jcmVhdGVkIjoiMjAxOS0wMS0yNFQxMDoyMzoyOC4wMDBaIiwiaWF0IjoxNTY5NzQ1NzgwLCJleHAiOjE1NzE4MTkzODB9.PN1qLUlFcQGK8Uqf3QMwDNtxFDRZegzVjfRIKsSbEVk';
  const response = await fetch(url, {
    headers: {
      'x-access-token': userToken,
    },
  });
  const json = await response.json();
  return json;
};

const fetchURL = async (url) => {
  const userToken = await AsyncStorage.getItem('userToken');
  const response = await fetch(url, {
    headers: {
      'x-access-token': userToken,
    },
  });
  const json = await response.json();
  return json;
};

const getTagFiles = async (tag) => {
  const tagresult = await fetchGetUrl(apiUrl + 'tags/' + tag);
  return tagresult;
};

const getAvatarTag = async (uid) => {
  const avatarResult = await getTagFiles('Avatar' + uid);
  const avatarID = avatarResult[0].file_id;
  const avatarFile = await fetchGetUrl(apiUrl + 'media/' + avatarID);
  return avatarFile.thumbnails.w320;
};

const getArticleDesc = async (fileid) => {
  const descResult = await fetchGetUrl(apiUrl + 'tags/file/' + fileid);
  for (let i = 0; i < descResult.length; i++) {
    if (descResult[i].tag.length > 30) {
      return descResult[i].tag;
    }
  }
  return 'Description not found';
};

const getArticleTags = (url) => {
  const {articles, setArticles, setAllArticles} = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const fetchUrl = async () => {
    // Hakee projektitagilla kaikki tiedostot
    const tagfiles = await getTagFiles('craftersguild');
    // Alustetaan array johon kerätään file_id tageusta
    const tagFileId = [];
    const taggedFilesList = [];
    for (let i = 0; i < tagfiles.length; i++) {
      // pusketaan haettujen tagimatchien file_id:t arrayhyn
      tagFileId.push(tagfiles[i].file_id);
    }
    // Haetaan mediafilet äsken kerätyillä file_id:llä
    for (let i = 0; i < tagFileId.length; i++) {
      const response = await fetch(url + tagFileId[i]);
      const json = await response.json();
      json.body = await getArticleDesc(tagFileId[i]);
      // Pusketaan taggedFilesList arrayhyn haetut mediat
      taggedFilesList.push(json);
    }
    // Laitetaan artikkeiliksi haetut, karsitut, mediat
    setArticles(taggedFilesList);
    setAllArticles(taggedFilesList);
    setLoading(false);
  };
  useEffect(() => {
    fetchUrl();
  }, []);
  return [articles, loading];
};

const ArticleHooks = () => {
  //
  const getArticleComments = (fileID) => {
    const {checkCommentUser} = appHooks();
    const {myComments, setMyComments} = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    console.log('Starting my comments fetching');
    const fetchUrl = async () => {
      console.log('fetchaa commentteja');
      console.log('failiiidee', fileID);
      const result = await fetchGetUrl(apiUrl + 'comments/file/' + fileID);
      for (let i = 0; i < result.length; i++) {
        console.log('usereita tseKKAILLAAN');
        result[i].username = await checkCommentUser(result[i].user_id);
        console.log(result[i].username);
      }
      setMyComments(result);
      setLoading(false);
    };
    useEffect(() => {
      fetchUrl();
    }, []);
    return [myComments, loading];
  };

  const getAllMedia = () => {
    // not in use
    const [articles, setArticles] = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      fetchGetUrl(apiUrl + 'media').then((json) => {
        setArticles(json);
        setLoading(false);
      });
    }, []);
    return [articles, loading];
  };

  const getThumbnail = (url) => {
    const [thumbnails, setThumbnails] = useState({});
    useEffect(() => {
      fetchGetUrl(apiUrl + 'media/' + url).then((json) => {
        setThumbnails(json.thumbnails);
      });
    }, []);
    return thumbnails;
  };

  const useFetch = (url) => {
    return (getArticleTags(url));
  };

  const getAllMyArticles = (userID) => {
    return getMyArticleTags();
  };
  const getMyArticleTags = () => {
    const myurl = 'http://media.mw.metropolia.fi/wbma/media/';
    const {myArticles, setMyArticles} = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    console.log('Starting my articles fetching');
    const fetchUrl = async () => {
      const gotuser = JSON.parse(await AsyncStorage.getItem('user'));
      const userID = gotuser.user_id;
      // Hakee projektitagilla kaikki tiedostot
      const tagfiles = await getTagFiles('craftersguild');
      // Alustetaan array johon kerätään file_id tageusta
      const tagFileId = [];
      const taggedFilesList = [];
      const filteredArticles = [];
      for (let i = 0; i < tagfiles.length; i++) {
        // pusketaan haettujen tagimatchien file_id:t arrayhyn
        tagFileId.push(tagfiles[i].file_id);
      }
      // Haetaan mediafilet äsken kerätyillä file_id:llä

      for (let i = 0; i < tagFileId.length; i++) {
        const response = await fetch(myurl + tagFileId[i]);
        const json = await response.json();
        json.body = await getArticleDesc(tagFileId[i]);
        // Pusketaan taggedFilesList arrayhyn haetut mediat
        taggedFilesList.push(json);
      }
      // haetaan käyttäjäkohtaiset artikkelit
      for (let i = 0; i < taggedFilesList.length; i++) {

        if (taggedFilesList[i].user_id == userID) {

          filteredArticles.push(taggedFilesList[i]);
        }
      }
      // asetetaan käyttäjäkohtaiset artikkelit
      setMyArticles(filteredArticles);
      setLoading(false);
    };
    useEffect(() => {
      fetchUrl();
    }, []);
    return [myArticles, loading];
  };

  const fetchDeleteUrl = async (url, token = '') => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('fetchDeleteUrl', url, userToken);
    const response = await fetch(apiUrl + url, {
      method: 'DELETE',
      headers: {
        'x-access-token': userToken,
      },
    });
    const json = await response.json();
    console.log('fetchDeleteUrl json', json);
    return json;
  };

  const reloadAllArticles = () => {
    const fetchUrl = async () => {
      const url = 'http://media.mw.metropolia.fi/wbma/media/';
      // Hakee projektitagilla kaikki tiedostot
      const tagfiles = await getTagFiles('craftersguild');
      // Alustetaan array johon kerätään file_id tageusta
      const tagFileId = [];
      const taggedFilesList = [];
      for (let i = 0; i < tagfiles.length; i++) {
        // pusketaan haettujen tagimatchien file_id:t arrayhyn
        tagFileId.push(tagfiles[i].file_id);
      }
      // Haetaan mediafilet äsken kerätyillä file_id:llä
      for (let i = 0; i < tagFileId.length; i++) {

        const response = await fetch(url + tagFileId[i]);
        const json = await response.json();
        json.body = await getArticleDesc(tagFileId[i]);
        // Pusketaan taggedFilesList arrayhyn haetut mediat
        taggedFilesList.push(json);
      }

      // Laitetaan artikkeiliksi haetut, karsitut, mediat
      return taggedFilesList;
    };
    return fetchUrl();
  };
  const reloadMyArticles = () => {
    const myurl = 'http://media.mw.metropolia.fi/wbma/media/';
    console.log('Starting my articles fetching');
    const fetchUrl = async () => {
      const gotuser = JSON.parse(await AsyncStorage.getItem('user'));
      const userID = gotuser.user_id;
      console.log('3. userid', userID);
      // Hakee projektitagilla kaikki tiedostot
      const tagfiles = await getTagFiles('craftersguild');

      // Alustetaan array johon kerätään file_id tageusta
      const tagFileId = [];
      const taggedFilesList = [];
      const filteredArticles = [];
      for (let i = 0; i < tagfiles.length; i++) {
        // pusketaan haettujen tagimatchien file_id:t arrayhyn
        tagFileId.push(tagfiles[i].file_id);
      }
      // Haetaan mediafilet äsken kerätyillä file_id:llä

      for (let i = 0; i < tagFileId.length; i++) {

        const response = await fetch(myurl + tagFileId[i]);
        const json = await response.json();
        json.body = await getArticleDesc(tagFileId[i]);
        // Pusketaan taggedFilesList arrayhyn haetut mediat
        taggedFilesList.push(json);
      }
      // haetaan käyttäjäkohtaiset artikkelit
      for (let i = 0; i < taggedFilesList.length; i++) {
        if (taggedFilesList[i].user_id == userID) {
          filteredArticles.push(taggedFilesList[i]);
        }
      }
      // asetetaan käyttäjäkohtaiset artikkelit
      return filteredArticles;
    };
    return fetchUrl();
  };

  //Used for instantly reloading comments.

  const reloadArticleComments = (fileID, setMyComments) => {
    const {checkCommentUser} = appHooks();
    const fetchUrl = async () => {
      const result = await fetchGetUrl(apiUrl + 'comments/file/' + fileID);
      for (let i = 0; i < result.length; i++) {
        result[i].username = await checkCommentUser(result[i].user_id);
      }
      return result;
    };
    console.log('fetchurling');
    fetchUrl().then((json) => {
      setMyComments(json);
      console.log('Settingmycomments')
      ;
    });
  };
  // ARCH ENEMY THAT REFUSED TO YELD
  const deleteArticle = async (fileID, setArticles, setMyArticles, setAllArticles, navigation) => {
    return fetchDeleteUrl('media/' + fileID).then((json) => {
      console.log('delete', json);
      setArticles([]);
      setMyArticles([]);
      setTimeout(() => {
        reloadAllArticles().then((json) => {
          setArticles(json);
          setAllArticles(json);
        });
        reloadMyArticles().then((json) => {
          setMyArticles(json);
        });
        Alert.alert(
            'Article Deleted',
            'Reloading user Articles',
            [
              {text: 'OK', onPress: () => navigation.navigate('Creator')},
            ],
            {cancelable: false},
        );
      }, 500);
    });
  };


  return {
    getAllMedia,
    getThumbnail,
    getAvatarTag,
    useFetch,
    getArticleDesc,
    getAllMyArticles,
    deleteArticle,
    getMyArticleTags,
    getArticleComments,
    reloadMyArticles,
    reloadAllArticles,
    reloadArticleComments,
  };
};

export default ArticleHooks;
