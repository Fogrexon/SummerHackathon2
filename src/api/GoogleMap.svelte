<script>
  import { onLocationChange } from '../stores/geoLocationStore';
  // eslint-disable-next-line import/prefer-default-export
  export let pins = [];

  let container;
  let map;
  // eslint-disable-next-line no-undef
  const apiKey = __myapp.env.GOOGLE_MAP_API_KEY;

  let lat;
  let lng;

  onLocationChange((value) => {
    lat = value.latitude;
    lng = value.longitude;
  });

  window.initMap = () => {
    // eslint-disable-next-line no-undef
    map = new google.maps.Map(container, {
      zoom: 10,
      center: { lat, lng },
    });
    console.log(map);
  };

  // onMount(async () => {
  // });
</script>
<svelte:head>
  <script defer async
	src="https://maps.googleapis.com/maps/api/js?key={apiKey}&callback=initMap">
	</script>
</svelte:head>
<style>
  .map {
    height: 100%;
    width: 100%;
  }
</style>
<div class="map" bind:this={container}>

</div>