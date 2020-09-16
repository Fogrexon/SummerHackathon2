
<script>
  import { Media } from 'sveltestrap';
  import { onMount } from 'svelte';
  import { getCurrentWeather } from '../../api/openweathermap';
  import { onLocationChange } from '../../stores/geoLocationStore';
  
  let currentWeather = [];
  onMount(() => {
    // このコンポーネントがマウントされたとき
    onLocationChange((value) => {
      // 座標情報が更新されたら(更新が入ってなくても初回に実行される)
      if (value.latitude === 0 && value.longitude === 0) return;
      getCurrentWeather(value.latitude, value.longitude)
        .then((data) => {
          currentWeather = data;
        });
    });
  });
</script>

<h2>Weather</h2>



<Media>
  <Media left href="#">
    <Media
      object
      src={currentWeather.weatherIconUrl}
      alt="currentWeather image" />
  </Media>
  <Media body>
    <Media heading><strong>{Math.floor(currentWeather.temperature)}℃</strong></Media>
    
  </Media>
</Media>


