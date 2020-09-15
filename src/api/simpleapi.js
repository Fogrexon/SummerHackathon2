/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import axiosJsonpAdapter from 'axios-jsonp';

// name: 駅名
// line: 路線名
// traveltime: 徒歩での時間

export const getNearStation = async (y, x) => {
  const params = {
    x,
    y,
    output: 'json',
  };
  try {
    const data = await axios.get('http://map.simpleapi.net/stationapi', {
      params,
      adapter: axiosJsonpAdapter,
      withCredentials: true,
    });
    if (!data.data) return [];
    return data.data.map(({ name, line, traveltime }) => ({ name, line, traveltime }));
  } catch (e) {
    return [];
  }
};
