import React from "react";

const fetchUrl = 'http://media.mw.metropolia.fi/wbma/';

const useFetch = () => {
  const checkAvailability = async (uname) => {
    const settings = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
    const response = await fetch(fetchUrl + 'users/username/' + uname, settings);
    const result = await response.json();
    const exists = result.available;
    console.log(exists);
    return exists;
  };
  const fetchPostUrl = async (url, data) => {
    console.log(url);
    console.log('fetchPostUrl data', data);
    const response = await fetch(fetchUrl+url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    console.log('fetchPostUrl json', json);
    return json;
  };
  return {
    checkAvailability,
    fetchPostUrl,
  };
};
export default useFetch;
