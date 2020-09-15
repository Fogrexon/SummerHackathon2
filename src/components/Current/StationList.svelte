<script>
  import { onMount } from 'svelte';
  import { Table } from 'sveltestrap';
  import { getNearStation } from '../../api/simpleapi';
  import { onLocationChange } from '../../stores/geoLocationStore';

  let stations = [];
  onMount(() => {
    // このコンポーネントがマウントされたとき
    onLocationChange((value) => {
      // 座標情報が更新されたら(更新が入ってなくても初回に実行される)
      if (value.latitude === 0 && value.longitude === 0) return;
      getNearStation(value.latitude, value.longitude)
        .then((data) => {
          stations = data;
        });
    });
  });
</script>
<Table>
  <thead>
    <tr>
      <th>#</th>
      <th>駅名</th>
      <th>路線</th>
      <th>所要時間</th>
    </tr>
  </thead>
  <tbody>
    {#each stations as station, i}
      <tr>
        <th scope="row">{i + 1}</th>
        <td>{station.name}</td>
        <td>{station.line}</td>
        <td>{station.traveltime.replace('以上', '')}</td>
      </tr>
    {/each}
  </tbody>
</Table>

<style>
  tbody {
    font-size: x-small;
  }
</style>