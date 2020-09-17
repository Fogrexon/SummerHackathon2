const functions = require('firebase-functions');
const request = require('request');
const axios = require('axios');
require('dotenv').config();

exports.weather = functions.https.onRequest((req, res) => {
  const proxyUrl = 'https://api.openweathermap.org/data/2.5/weather';
  const params = req.query;
  delete params.severity;
  delete params.message;
  params.appid = process.env.WEATHER_MAP_API_KEY;
  axios.get(proxyUrl, {
    params,
  })
    .then((data) => res.status(200).send(data.data))
    .catch((err) => {
      functions.logger.log(err);
      res.status(500).send({});
      return false;
    });
});
exports.gurunavi = functions.https.onRequest((req, res) => {
  const proxyUrl = 'https://api.gnavi.co.jp/RestSearchAPI/v3';

  const params = req.query;
  delete params.severity;
  delete params.message;
  params.keyid = process.env.GURUNAVI_API_KEY;
  axios.get(proxyUrl, { params })
    .then((data) => res.status(200).send(data.data))
    .catch((err) => {
      functions.logger.log(err);
      if (err.response.status === 404) {
        res.status(200).send({
          hit_pesr_page: 0,
          total_hit_count: 0,
          rest: [],
        });
      } else res.status(500).send({});
      return false;
    });
});
exports.placelabel = functions.https.onRequest((req, res) => {
  const proxyUrl = 'https://map.yahooapis.jp/placeinfo/V1/get';
  const params = req.query;
  delete params.severity;
  delete params.message;
  params.appid = process.env.YAHOO_API_KEY;
  axios.get(proxyUrl, { params })
    .then((data) => res.status(200).send(data.data))
    .catch((err) => {
      functions.logger.log(err);
      res.status(500).send({});
      return false;
    });
});
exports.entertainment = functions.https.onRequest((req, res) => {
  const proxyUrl = 'https://map.yahooapis.jp/search/local/V1/localSearch';
  const params = req.query;
  delete params.severity;
  delete params.message;
  params.appid = process.env.YAHOO_API_KEY;
  axios.get(proxyUrl, { params })
    .then((data) => res.status(200).send(data.data))
    .catch((err) => {
      functions.logger.log(err);
      res.status(500).send({});
      return false;
    });
});
exports.station = functions.https.onRequest((req, res) => {
  const proxyUrl = 'http://map.simpleapi.net/stationapi';
  const params = req.query;
  delete params.severity;
  delete params.message;
  axios.get(proxyUrl, { params })
    .then((data) => res.status(200).send(data.data))
    .catch((err) => {
      functions.logger.log(err);
      res.status(500).send({});
      return false;
    });
});

exports.weathericon = functions.https.onRequest(function (req, res) {
  const url = `http://openweathermap.org/img/wn/${req.query.id}@4x.png`;
  request.get(url).pipe(res);
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
