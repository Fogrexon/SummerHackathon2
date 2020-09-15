/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import { writable } from 'svelte/store';

export const geoLocation = writable({ latitude: 0, longitude: 0 });
export const onLocationChange = (f) => geoLocation.subscribe(f);

const success = (pos) => {
  const { latitude, longitude } = pos.coords;
  geoLocation.set({
    latitude,
    longitude,
  });
};
const error = () => console.error(new Error('Geolocation API is off'));
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
}
