
<script>
/* eslint-disable no-undef */
import { onLocationChange } from '../stores/geoLocationStore';
import { pins } from '../stores/pinsStore';

let container;
let map;
// eslint-disable-next-line no-undef
const apiKey = __myapp.env.GOOGLE_MAP_API_KEY;

let lat;
let lng;
let pinNum = 0;

const makeUserLocation = () => {
  // eslint-disable-next-line no-unused-vars
  const marker = new google.maps.Marker({
    map,
    position: new google.maps.LatLng(lat, lng),
    animation: google.maps.Animation.DROP,
    icon: {
      fillColor: '#FF0000', // 塗り潰し色
      fillOpacity: 0.8, // 塗り潰し透過率
      path: google.maps.SymbolPath.CIRCLE, // 円を指定
      scale: 10, // 円のサイズ
      strokeColor: '#FF0000', // 枠の色
      strokeWeight: 1.0, // 枠の透過率
    },
  });
};

const makePlacePin = () => {
  pins.subscribe((value) => {
    console.log(value);
    value.slice(pinNum, value.length).map((place) => {
      const marker = new google.maps.Marker({ // マーカーの追加
        position: {
          lat: place.latitude,
          lng: place.longitude,
        }, // マーカーを立てる位置を指定
        animation: google.maps.Animation.DROP,
        icon: place.type === 'Yahoo' ? {
          url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        } : null,
        map, // マーカーを立てる地図を指定
      });

      const infoWindow = new google.maps.InfoWindow({ // 吹き出しの追加
        content: place.url ? `<a href=${place.url}>${place.description}</a>` : `<div>${place.description}</div>`, // 吹き出しに表示する内容
      });
      marker.addListener('click', () => { // マーカーをクリックしたとき
        infoWindow.open(map, marker); // 吹き出しの表示
      });

      pinNum = value.length;
      return null;
    });
  });
};
onLocationChange((value) => {
  lat = value.latitude;
  lng = value.longitude;
});

window.initMap = () => {
  // eslint-disable-next-line no-undef
  map = new google.maps.Map(container, {
    zoom: 15,
    center: { lat, lng },
  });
  makeUserLocation();
  makePlacePin();
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