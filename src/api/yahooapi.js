/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import axiosJsonpAdapter from 'axios-jsonp';

export const getPlaceLabel = async (lat, lon) => {
  const params = {
    lat,
    lon,
    appid: __myapp.env.YAHOO_API_KEY,
  };
  try {
    const placeLabel = await axios.get('https://map.yahooapis.jp/placeinfo/V1/get', {
      params,
      adapter: axiosJsonpAdapter,
    });
    if (placeLabel.status !== 200) return '';
    const {
      data: {
        ResultSet: {
          Roadname,
          Address: [
            _,
            City,
            Town,
            TownNum,
          ],
        },
      },
    } = placeLabel;
    return Roadname || (City + Town + (TownNum || ''));
  } catch (e) {
    return e;
  }
};

export const getNearEntertainment = async (lat, lon, start = 1) => {
  const params = {
    appid: __myapp.env.YAHOO_API_KEY,
    lat,
    lon,
    dist: 3,
    output: 'json',
    gc: '0303,0305',
    sort: 'hybrid',
    results: 10,
    start,
  };
  try {
    const data = await axios.get('https://map.yahooapis.jp/search/local/V1/localSearch', {
      params,
      adapter: axiosJsonpAdapter,
    });
    console.log(data);
    const {
      ResultInfo: {
        Total,
      },
      Feature,
    } = data.data;

    return {
      total: Total,
      features: Feature.map((f) => ({
        name: f.Name,
        longitude: f.Geometry.Coordinates.split(',')[0] * 1,
        latitude: f.Geometry.Coordinates.split(',')[1] * 1,
        category: f.Property.Genre[0].Name,
        description: f.Description,
        station:
          f.Property.Station
            ? f.Property.Station.map(({ Name, Time }) => ({ name: Name, time: Time }))
            : null,
        url: `https://loco.yahoo.co.jp/place/g-${f.Gid}`,
      })),
    };
  } catch (e) {
    console.error(e);
    return [];
  }
};
