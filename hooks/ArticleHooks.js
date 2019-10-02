import {useEffect, useContext, useState} from "react";
import { AsyncStorage } from "react-native";
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
    console.log('fetchUrl json', json);
    return json;
  };

const ArticleHooks = () => {

    const getAllMedia = () => {
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
        const { articles, setArticles } = useContext(AppContext);
        const [loading, setLoading] = useState(true);
        const fetchUrl = async () => {
          const response = await fetch(url);
          const json = await response.json();
          setArticles(json);
          setLoading(false);
        };
        useEffect(() => {
          fetchUrl();
        }, []);
        return [articles, loading];
      };

      return {
          getAllMedia,
          getThumbnail,
          useFetch,
      };
}

export default ArticleHooks;
