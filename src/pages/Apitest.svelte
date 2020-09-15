<script>
  // import GoogleMap from '../api/googlemapapi.svelte';
  import { getNearRestaurant } from '../api/gurunaviapi';
  import { getCurrentWeather } from '../api/openweathermap';
  import { getNearStation } from '../api/simpleapi';
  import { getPlaceLabel, getNearEntertainment } from '../api/yahooapi';
  import { onLocationChange } from '../stores/geoLocationStore';
  import GoogleMap from '../api/GoogleMap.svelte';

  let latitude;
  let longitude;

  onLocationChange((val) => {
    latitude = val.latitude;
    longitude = val.longitude;
    if (latitude === 0 && longitude === 0) return;
    getNearRestaurant(latitude, longitude).then((data) => console.log(data));
    getCurrentWeather(latitude, longitude).then((data) => console.log(data));
    getNearStation(latitude, longitude).then((data) => console.log(data));
    getPlaceLabel(latitude, longitude).then((data) => console.log(data));
    getNearEntertainment(latitude, longitude).then((data) => console.log(data));
  });
</script>

<div>
  data
</div>
<div class="map">
  <GoogleMap />
</div>

<style>
  .map {
    height: 500px;
    width: 500px;
  }
</style>