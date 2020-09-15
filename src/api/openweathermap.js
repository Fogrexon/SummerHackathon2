/* eslint-disable no-undef */
import axios from 'axios';

const ABSOLUTE_TEMPERATURE = 273.15;

// weather: 天気,
// weatherDetail: 天気の詳細,
// temperature: 温度 摂氏,
// windSpeed: 速度,
// windDegree: 角度,
// city: 都市名,
// cityId: 都市のAPIでのID,

const getCurrentWeatherData = (data) => {
  const {
    weather: [
      {
        main,
        description,
      },
    ],
    main: {
      temp,
    },
    wind: {
      speed,
      deg,
    },
    name,
    id,
  } = data;

  return {
    weather: main,
    weatherDetail: description,
    temperature: temp - ABSOLUTE_TEMPERATURE,
    windSpeed: speed,
    windDegree: deg,
    city: name,
    cityId: id,
  };
};
// city: 都市名
// cityId: 都市ID
// forecast
  // temperature: 温度,
  // weather: day.weather.main,
  // weatherDetail: day.weather.description,
  // windSpeed: day.speed,
  // windDegree: day.deg,
const getWeatherForecastData = (data) => {
  const {
    city: {
      id,
      name,
    },
    list,
  } = data;
  const forecast = list.map((day) => ({
    temperature: day.temp.day - ABSOLUTE_TEMPERATURE,
    weather: day.weather.main,
    weatherDetail: day.weather.description,
    windSpeed: day.speed,
    windDegree: day.deg,
  }));

  return {
    city: name,
    cityId: id,
    forecast,
  };
};

export const getCurrentWeather = async (lat, lon) => {
  const params = {
    lat,
    lon,
    appid: __myapp.env.WEATHER_MAP_API_KEY,
  };

  const url = 'https://api.openweathermap.org/data/2.5/weather';

  try {
    const data = await axios.get(url, { params });
    return getCurrentWeatherData(data.data);
  } catch (e) {
    return e;
  }
};

export const getWeatherForecast = async (lat, lon, cnt) => {
  const params = {
    lat,
    lon,
    cnt,
    appid: __myapp.env.WEATHER_MAP_API_KEY,
  };

  const url = 'https://api.openweathermap.org/data/2.5/forecast/daily';

  try {
    const data = await axios.get(url, { params });
    return getWeatherForecastData(data.data);
  } catch (e) {
    return e;
  }
};
