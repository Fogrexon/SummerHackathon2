
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

<h4>{currentWeather.city}</h4>

<div class="weather">
  <div class="weathericon">
    <Media left href="#">
      <Media
        object
        src={currentWeather.weatherIconUrl}
        alt="currentWeather image" />
    </Media>
  </div>
  <div class="temperature">
    <span>{Math.floor(currentWeather.temperature)}℃</span>
  </div>
</div>

<style>
.weather {
  display:flex;
  align-content: space-around;
}
.weathericon {
  flex-grow:2;
  align-self: center;
}
.temperature {
  flex-grow:2;
  align-self: center;
  font-size: 40px;
}

</style>