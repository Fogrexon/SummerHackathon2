<script>
  import { Media } from 'sveltestrap';
  import { onMount } from 'svelte';
  import { getCurrentWeather } from '../../api/openweathermap';
  import { onLocationChange } from '../../stores/geoLocationStore';
  
  let CurrentWeather = [];
  onMount(() => {
    // このコンポーネントがマウントされたとき
    onLocationChange((value) => {
      // 座標情報が更新されたら(更新が入ってなくても初回に実行される)
      if (value.latitude === 0 && value.longitude === 0) return;
      getCurrentWeather(value.latitude, value.longitude)
        .then((data) => {
          CurrentWeather = data;
        });
    });
  });
</script>
<Media>
  <Media left href="#">
    <Media
      object
      src="http://openweathermap.org/img/wn/10d@2x.png"
      alt="CurrentWeather image" />
  </Media>
  <Media body>
    <Media heading><strong>XX℃</strong></Media>
    
  </Media>
</Media>

