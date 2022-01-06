const axios = require('axios')

function get(...args) {
  return axios.get(...args)
}

function post(...args) {
  return axios.post(...args);
}

function put(...args) {
  return axios.put(...args);
}

module.exports={get, post, put};