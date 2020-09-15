<script>
  import { onMount } from 'svelte';
  import { onLocationChange } from '../../stores/geoLocationStore';
  import { getPlaceLabel } from '../../api/yahooapi';

  let label;
  onMount(() => {
    onLocationChange((value) => {
      const { latitude, longitude } = value;
      if (latitude === 0 && longitude === 0) return;
      getPlaceLabel(latitude, longitude)
        // eslint-disable-next-line no-return-assign
        .then((_label) => (label = _label));
    });
  });
</script>

<h1>
  {label}
</h1>