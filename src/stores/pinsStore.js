// eslint-disable-next-line import/no-extraneous-dependencies
import { writable } from 'svelte/store';

export const pins = writable([]);
export const addPins = (morePins) => {
  pins.update((n) => [...n, ...morePins]);
};
