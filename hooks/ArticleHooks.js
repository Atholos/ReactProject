import {useEffect, useContext, useState} from 'react';
import {AsyncStorage, Alert} from 'react-native';
import {AppContext} from '../contexts/AppContext';


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
  // console.log('fetchUrl json', json);
  return json;
};

const fetchURL = async (url) => {
  const userToken = await AsyncStorage.getItem('userToken');
  // console.log('fetchGetUrl', url);
  const response = await fetch(url, {
    headers: {
      'x-access-token': userToken,
    },
  });
  const json = await response.json();
  // console.log('fetchUrl json', json);
  return json;
};

const getTagFiles = async (tag) => {
  //console.log('TAGISSA ON KÄYTY', tag);
  const tagresult = await fetchGetUrl(apiUrl + 'tags/' +tag);
  //console.log('TAGRESULT', tagresult)
  return tagresult;
};

const getAvatarTag = async (uid) =>{
  const avatarResult = await getTagFiles('Avatar'+uid);
  //console.log('AVATAR RESULT', avatarResult[0]);
  const avatarID = avatarResult[0].file_id;
  const avatarFile = await fetchGetUrl(apiUrl + 'media/' + avatarID);
  //console.log(apiUrl + 'media/' + avatarID);
  //console.log('USERAVATAR', avatarFile);
  return avatarFile.thumbnails.w320;
};

const getArticleTags = (url) => {
  const {articles, setArticles} = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const fetchUrl = async () => {
    // Hakee projektitagilla kaikki tiedostot
    const tagfiles = await getTagFiles('craftersguild');
    // Alustetaan array johon kerätään file_id tageusta
    const tagFileId = [];
    const taggedFilesList = [];
    for (let i=0; i < tagfiles.length; i++) {
      // pusketaan haettujen tagimatchien file_id:t arrayhyn
      tagFileId.push(tagfiles[i].file_id);
    }
    // Haetaan mediafilet äsken kerätyillä file_id:llä
    for (let i=0; i < tagFileId.length; i++) {
      // console.log('rullaa');
      const response = await fetch(url + tagFileId[i]);
      const json = await response.json();
      // Pusketaan taggedFilesList arrayhyn haetut mediat
      taggedFilesList.push(json);
    }
    // console.log('TAGGED FILES LIST', taggedFilesList);
    // Laitetaan artikkeiliksi haetut, karsitut, mediat
    setArticles(taggedFilesList);
    setLoading(false);
  };
  useEffect(() => {
    fetchUrl();
  }, []);
  return [articles, loading];
};

const ArticleHooks = () => {
  const getArticleDesc = async (fileid) => {
    const descResult = await fetchGetUrl(apiUrl + 'tags/file/' + fileid);
    // console.log(descResult);
    for (let i=0; i < descResult.length; i++) {
      if (descResult[i].tag.length > 30) {
        return descResult[i].tag;
        console.log('JACKPOT', descResult[i].tag);
      }
    }
    return 'Description not found';
  };

  const getAllMedia = () => {
    // console.log('getAllMedia');
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
    const [articles, loading] = useFetch('http://media.mw.metropolia.fi/wbma/media/');
    const allArticles = [articles];
    //console.log('ALL MY ARTICLES', allArticles[0][19].user_id, userID);
    const myArticles = [];
    for (let i=0; i < allArticles[0].length; i++) {
      //console.log('tsekkaus toimii')
      if (allArticles[0][i].user_id == userID) {
        console.log('mätsi paikassa', i)
        myArticles.push(allArticles[0][i]);
      }
    }
    console.log('MYARTICLES !! ! ! ! ! ! ! ! !  ', myArticles);
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

  const deleteArticle = async (article, setMyArticles, setArticles, navigation) => {
    return fetchDeleteUrl('media/' + article.file_id).then((json) => {
       console.log('delete', json);
      setArticles([]);
      setMyArticles([]);
      setTimeout(() => {
        // reloadAllMedia(setArticle, setMyArticle);
        Alert.alert(
            'Article Deleted',
            'Reloading user Articles',
            [
              {text: 'OK', onPress: () => {navigation.navigate('Creator')}},
            ],
            {cancelable: false},
        );
      }, 2000);
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
  };
};

export default ArticleHooks;
