
<script>
/* eslint-disable no-undef */
import { Spinner } from 'sveltestrap';
import { onLocationChange } from '../stores/geoLocationStore';
import { pins } from '../stores/pinsStore';

let container;
let map;
// eslint-disable-next-line no-undef
const apiKey = __myapp.env.GOOGLE_MAP_API_KEY;

let lat;
let lng;
let pinNum = 0;
let loading = true;

const makeUserLocation = () => {
  // eslint-disable-next-line no-unused-vars
  const marker = new google.maps.Marker({
    map,
    position: new google.maps.LatLng(lat, lng),
    animation: google.maps.Animation.DROP,
    label: 'U',
  });
};

const makePlacePin = () => {
  pins.subscribe((value) => {
    value.slice(pinNum, value.length).map((place) => {
      const marker = new google.maps.Marker({ // マーカーの追加
        position: {
          lat: place.latitude,
          lng: place.longitude,
        }, // マーカーを立てる位置を指定
        animation: google.maps.Animation.DROP,
        icon: {
          fillColor: place.type === 'Yahoo' ? '#0000FF' : '#FF0000',
          fillOpacity: 0.8,
          path: google.maps.SymbolPath.CIRCLE,
          scale: 15,
          strokeColor: '#FF0000',
          strokeWeight: 1.0,
          anchor: google.maps.Point(0, 0),
        },
        label: {
          color: 'white',
          text: `${place.label}`,
        },
        map,
      });

      const infoWindow = new google.maps.InfoWindow({ // 吹き出しの追加
        content: place.url ? `<a href=${place.url}>${place.description}</a>` : `<div>${place.description}</div>`, // 吹き出しに表示する内容
      });
      let openFlag = false;
      marker.addListener('click', () => { // マーカーをクリックしたとき
        if (openFlag) {
          infoWindow.close();
          openFlag = false;
        } else {
          infoWindow.open(map, marker);
          openFlag = true;
        }
      });

      pinNum = value.length;
      return null;
    });
  });
};

window.initMap = () => {
  onLocationChange((value) => {
    lat = value.latitude;
    lng = value.longitude;
    if (lat === 0 && lng === 0) return;
    loading = false;
    // eslint-disable-next-line no-undef
    map = new google.maps.Map(container, {
      zoom: 15,
      center: { lat, lng },
    });
    makeUserLocation();
    makePlacePin();
  });
};

// onMount(async () => {
// });
</script>
<svelte:head>
  <script defer async
	src="https://maps.googleapis.com/maps/api/js?key={apiKey}&callback=initMap">
	</script>
</svelte:head>
{#if loading}
  <div class="loading-box map">
      <Spinner color="primary"/>
  </div>
{/if}
<div class="map" bind:this={container}>
</div>
<style>
  .map {
    height: 100%;
    width: 100%;
  }
  .loading-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>