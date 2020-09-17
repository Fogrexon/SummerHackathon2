<script>
  import { onMount } from 'svelte';
  import { Spinner } from 'sveltestrap';
  import Card from './Card.svelte';
  import { getNearEntertainment } from '../../api/yahooapi';
  import { onLocationChange } from '../../stores/geoLocationStore';
  import { addPins } from '../../stores/pinsStore';

  let lat;
  let lon;
  let restNum = 0;
  let totalHitCount = 0;

  let features = [];
  let loading = true;
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
            name, latitude, longitude, url,
          }) => ({
            description: name,
            url,
            latitude: latitude * 1,
            longitude: longitude * 1,
            type: 'Yahoo',
            // eslint-disable-next-line no-plusplus
            label: (restNum++) + 1,
          })));
          loading = false;
        });
    });
  });

  const getMoreRestaurants = () => {
    loading = true;
    getNearEntertainment(lat, lon, restNum + 1)
      .then((data) => {
        features = [
          ...features,
          ...data.features.map((rest, i) => ({ ...rest, label: restNum + i + 1 })),
        ];

        addPins(data.features.map(({
          name, latitude, longitude, url,
        }) => ({
          description: name,
          url,
          latitude: latitude * 1,
          longitude: longitude * 1,
          type: 'Yahoo',
          // eslint-disable-next-line no-plusplus
          label: (restNum++) + 1,
        })));
        loading = false;
      });
  };
</script>
<div class="entertainments">
  <h2>周辺のエンタメ施設</h2>
  <ul class="card-list">
    {#each features as feature}
      <Card
        name={`${feature.label}: ${feature.name}`}
        category={feature.category}
        url={feature.url}
        />
    {/each}
    {#if loading}
      <div class="end-of-list">
        <Spinner color="primary" />
      </div>
    {:else if restNum < totalHitCount}
      <div class="end-of-list">
        <i class="fas fa-plus next-icon" on:click={() => getMoreRestaurants()}></i>
      </div>
    {/if}
  </ul>
</div>

<style>
  .entertainments {

  }
  .card-list {
    overflow-x: auto;
    white-space: nowrap;
    padding: 0px 10px;
  }
  .end-of-list {
    height: 100%;
    display: inline-block;
    justify-content: center;
    align-items: center;
  }
  .next-icon {
    font-size: 50px;
  }
</style>