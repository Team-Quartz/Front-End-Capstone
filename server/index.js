const express = require('express');
const { GITHUB_API_KEY } = require('./config.js');
const axios = require('axios');

const port = 3000;
const app = express();

app.use(express.json());

const API_URL = `https://app-hrsei-api.herokuapp.com/api/fec2/:hratx`;

app.use('/API', (req, res) => {
  req.headers.Authorization = GITHUB_API_KEY;
  console.log('sending to:', req.url)
  console.log('========================================================================================')
  //cookies?
  axios({
    method: req.method,
    url: API_URL + req.url,
    data: req.body,
    headers: {
      Authorization: GITHUB_API_KEY,
    }
  })
    .then(response => {
      console.log(response);
    })
    .then(() => {
      res.send('hi there!');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

app.use(express.static('client/dist'));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
