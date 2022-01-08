const express = require('express');
const { GITHUB_API_KEY } = require('./config.js');
const axios = require('axios');

const port = 3000;
const app = express();

app.use(express.json());

const API_URL = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx`;

app.use('/API', (req, res) => {
  req.headers.Authorization = GITHUB_API_KEY;
  axios({
    method: req.method,
    url: API_URL + req.url,
    data: req.body,
    headers: {
      Authorization: GITHUB_API_KEY,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send();
    });
});

app.use(express.static('client/dist'));

app.listen(port, () => {
  console.log(`listening on port ${port}: \n Visit localhost:${port} to view the app!`);
});
