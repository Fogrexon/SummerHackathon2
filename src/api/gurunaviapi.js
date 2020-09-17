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
    total_hit_count,
    rest,
  } = data;

  const restaurants = rest.map(({
    name, latitude, longitude, image_url: { shop_image1 }, url, category,
  }) => ({
    name,
    latitude,
    longitude,
    image: shop_image1,
    url,
    category,
  }));

  return {
    hitPerPage: hit_per_page,
    totalHitCount: total_hit_count,
    restaurants,
  };
};

export const getNearRestaurant = async (lat, lon, offset = 1) => {
  const params = {
    latitude: lat,
    longitude: lon,
    offset,
    range: 3,
    keyid: __myapp.env.GURUNAVI_API_KEY,
  };
  const url = 'https://api.gnavi.co.jp/RestSearchAPI/v3';

  try {
    const data = await axios.get(url, { params });
    return getRestaurantData(data.data);
  } catch (e) {
    return e;
  }
};
