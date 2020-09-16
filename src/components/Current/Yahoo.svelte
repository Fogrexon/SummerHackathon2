<script>
  import { onMount } from 'svelte';
  import { Button } from 'sveltestrap';
  import Card from './Card.svelte';
  import { getNearEntertainment } from '../../api/yahooapi';
  import { onLocationChange } from '../../stores/geoLocationStore';
  import { addPins } from '../../stores/pinsStore';

  let lat;
  let lon;
  let restNum = 0;
  let totalHitCount = 0;

  let features = [];
  onMount(() => {
    // このコンポーネントがマウントされたとき
    onLocationChange((value) => {
      // 座標情報が更新されたら(更新が入ってなくても初回に実行される)
      lat = value.latitude;
      lon = value.longitude;
      if (lat === 0 && lon === 0) return;
      getNearEntertainment(lat, lon)
        .then((data) => {
          features = data.features.map((rest, i) => ({ ...rest, label: restNum + i + 1 }));
          totalHitCount = data.total;
          addPins(features.map(({
            name, latitude, longitude,
          }) => ({
            description: name,
            latitude: latitude * 1,
            longitude: longitude * 1,
            type: 'Yahoo',
            // eslint-disable-next-line no-plusplus
            label: (restNum++) + 1,
          })));
        });
    });
  });

  const getMoreRestaurants = () => {
    getNearEntertainment(lat, lon, restNum + 1)
      .then((data) => {
        features = [
          ...features,
          ...data.features.map((rest, i) => ({ ...rest, label: restNum + i + 1 })),
        ];

        addPins(data.features.map(({
          name, latitude, longitude,
        }) => ({
          description: name,
          latitude: latitude * 1,
          longitude: longitude * 1,
          type: 'Yahoo',
          // eslint-disable-next-line no-plusplus
          label: (restNum++) + 1,
        })));
      });
  };
</script>

<h2>周辺のエンタメ施設</h2>
<div class="card-list">
  {#each features as feature}
    <Card
      name={`${feature.label}: ${feature.name}`}
      category={feature.category}
      />
  {/each}
  {#if restNum < totalHitCount}
    <Button color="primary" on:click={() => getMoreRestaurants()}>More Places</Button>
  {/if}
</div>

<style>
  .card-list {
    flex: flex;
    flex-wrap: nowrap;
  }
</style>