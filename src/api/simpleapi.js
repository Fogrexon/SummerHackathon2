/* eslint-disable import/prefer-default-export */
import axios from 'axios';

// name: 駅名
// line: 路線名
// traveltime: 徒歩での時間

export const getNearStation = async (x, y) => {
  const queryString = Object.entries({
    x,
    y,
    output: 'json',
  })
    .map((query) => `${query[0]}=${query[1]}`).join('&');

  try {
    const data = await axios.get(`http://map.simpleapi.net/stationapi?${queryString}`)
      .map(({ name, line, traveltime }) => ({ name, line, traveltime }));
    return data;
  } catch (e) {
    return e;
  }
};
