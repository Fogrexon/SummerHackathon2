/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

// name: 店舗名,
// latitude: 緯度
// longitude: 経度
// image: 店舗画像,
// url: ウェブサイトのURL

const getRestaurantData = (data) => {
  const {
    hit_per_page,
    rest,
  } = data;

  const restaurants = rest.map(({
    name, latitude, longitude, image_url: { shop_image1 }, url,
  }) => ({
    name,
    latitude,
    longitude,
    image: shop_image1,
    url,
  }));

  return {
    count: hit_per_page,
    restaurants,
  };
};

export const getNearRestaurant = async (lat, lon) => {
  const queryString = Object.entries({
    latitude: lat,
    longitude: lon,
    keyid: __myapp.env.GURUNAVI_API_KEY,
  })
    .map((iter) => `${iter[0]}=${iter[1]}`).join('&');

  const url = `https://api.openweathermap.org/data/2.5/weather?${queryString}`;

  try {
    const data = await axios.get(url);
    return getRestaurantData(data);
  } catch (e) {
    return e;
  }
};
