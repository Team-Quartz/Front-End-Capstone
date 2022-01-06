const axios = require('axios');

const cache = {};

function get(url, config) {
  if (url.endsWith('/')) url = url.slice(0, url.length - 1);
  if (!url.startsWith('/')) url = `/${url}`;

  let paramString = '';
  if (config && config.params) {
    console.log(config.params);
    paramString = `?${Object.entries(config.params)
      .map(([key, val]) => `${key}=${val}`)
      .join('&')}`;
  }

  const urlString = url + paramString;

  if (cache[urlString]) {
    return new Promise((resolve, reject) => {
      console.log('using cache for ', urlString)
      //hacky stringify-parse to deep copy the object
      resolve(JSON.parse(JSON.stringify(cache[urlString])));
    });
  }
  return axios.get(url, config).then((response) => {
    const cacheData = { data: response.data };
    cache[urlString] = cacheData;
    return cacheData;
  });
}

function post(...args) {
  return axios.post(...args);
}

function put(...args) {
  return axios.put(...args);
}

module.exports = { get, post, put };
