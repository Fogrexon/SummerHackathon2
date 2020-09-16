<script>
  import { onMount } from 'svelte';
  import { Button } from 'sveltestrap';
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

<h2>ぐるなび検索</h2>
<div class="card-list">
  {#each restaurants as restaurant}
    <Card
      name={`${restaurant.label}: ${restaurant.name}`}
      url={restaurant.url}
      category={restaurant.category}
      />
  {/each}
  {#if restNum < totalHitCount}
    <Button color="primary" on:click={() => getMoreRestaurants()}>More Restaurants</Button>
  {/if}
</div>

<style>
  .card-list {
    flex: flex;
    flex-wrap: nowrap;
  }
</style>