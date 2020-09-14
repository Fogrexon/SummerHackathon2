/* eslint-disable no-undef */
import axios from 'axios';

const getCurrentWeatherData = (data) => {
  const {
    weather: {
      main,
      description,
    },
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
    temperature: temp,
    windSpeed: speed,
    windDegree: deg,
    city: name,
    cityId: id,
  };
};

const getWeatherForecastData = (data) => {
  const {
    city: {
      id,
      name,
    },
    list,
  } = data;
  const forecast = list.map((day) => ({
    temperature: day.temp.day,
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

export const getNowWeather = async (query) => {
  const queryString = Object.entries({ ...query, appid: __myapp.env.WEATHER_MAP_API_KEY })
    .map((iter) => `${iter[0]}=${iter[1]}`).join('&');

  const url = `https://api.openweathermap.org/data/2.5/weather?${queryString}`;

  try {
    const data = await axios.get(url);
    return getCurrentWeatherData(data);
  } catch (e) {
    return e;
  }
};

export const getWeatherForecast = async (query) => {
  const queryString = Object.entries({ ...query, appid: __myapp.env.WEATHER_MAP_API_KEY })
    .map((iter) => `${iter[0]}=${iter[1]}`).join('&');

  const url = `https://api.openweathermap.org/data/2.5/forecast/daily?${queryString}`;

  try {
    const data = await axios.get(url);
    return getWeatherForecastData(data);
  } catch (e) {
    return e;
  }
};
