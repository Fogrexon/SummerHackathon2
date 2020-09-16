<script>
  import { onMount } from 'svelte';
  import Card from './Card.svelte';
  import { getNearRestaurant } from '../../api/gurunaviapi';
  import { onLocationChange } from '../../stores/geoLocationStore';
  import { addPins } from '../../stores/pinsStore';

  let lat;
  let lon;
  let restNum = 0;
  let totalHitCount = 0;

  let restaurants = [];
  onMount(() => {
    // このコンポーネントがマウントされたとき
    onLocationChange((value) => {
      // 座標情報が更新されたら(更新が入ってなくても初回に実行される)
      lat = value.latitude;
      lon = value.longitude;
      if (lat === 0 && lon === 0) return;
      getNearRestaurant(lat, lon)
        .then((data) => {
          restaurants = data.restaurants.map((rest, i) => ({ ...rest, label: restNum + i + 1 }));
          totalHitCount = data.totalHitCount;
          addPins(restaurants.map(({
            name, url, latitude, longitude,
          }) => ({
            description: name,
            url,
            latitude: latitude * 1,
            longitude: longitude * 1,
            type: 'Gurunavi',
            // eslint-disable-next-line no-plusplus
            label: (restNum++) + 1,
          })));
        });
    });
  });

  const getMoreRestaurants = () => {
    getNearRestaurant(lat, lon, restNum + 1)
      .then((data) => {
        restaurants = [
          ...restaurants,
          // eslint-disable-next-line no-plusplus
          ...data.restaurants.map((rest, i) => ({ ...rest, label: restNum + i + 1 })),
        ];

        addPins(data.restaurants.map(({
          name, url, latitude, longitude,
        }) => ({
          description: name,
          url,
          latitude: latitude * 1,
          longitude: longitude * 1,
          type: 'Gurunavi',
          // eslint-disable-next-line no-plusplus
          label: (restNum++) + 1,
        })));
      });
  };
</script>
<div class="wrapper">
  <h2>ぐるなび検索</h2>
  <ul class="card-list">
    {#each restaurants as restaurant}
      <Card
        name={`${restaurant.label}: ${restaurant.name}`}
        url={restaurant.url}
        category={restaurant.category}
        />
    {/each}
    {#if restNum < totalHitCount}
      <div class="end-of-list">
        <i class="fas fa-plus next-icon" on:click={() => getMoreRestaurants()}></i>
      </div>
      
    {/if}
  </ul>
</div>

<style>
  .wrapper {
    margin: 5px 0px;
    padding: 5px;
  }
  .card-list {
    overflow-x: auto;
    white-space: nowrap;
    padding: 10px;
  }
  .end-of-list {
    height: 100%;
    display: inline-block;
    justify-content: center;
    align-items: center;
  }
  .next-icon {
    font-size: 50px;
    cursor: pointer;
  }
</style>