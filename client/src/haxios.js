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

  //if it's cached, return it (in a promise, since that's the expected output)
  if (cache[urlString]) {
    return new Promise((resolve, reject) => {
      //hacky stringify-parse to deep copy the object
      //Promise.resolve is because the cache contents can be a promise, if we're still waiting for axios to get back to us
      resolve(JSON.parse(JSON.stringify(Promise.resolve(cache[urlString]))));
    });
  }

  const getRequest = axios
    .get(url, config)
    .then((response) => {
      //once the promise resolves, replace the cache contents with the data, rather than the promise itself
      const responseOb = { data: response.data };
      cache[urlString] = responseOb;
      return responseOb;
    })
    .catch((err) => {
      //if the promise rejects, throw out the cache entry
      cache[urlString] = undefined;
      throw err;
    });

  //store the promise in the cache, until it's resolved
  cache[urlString] = getRequest;
  return getRequest;
}

function post(...args) {
  return axios.post(...args);
}

function put(...args) {
  return axios.put(...args);
}

module.exports = { get, post, put };
