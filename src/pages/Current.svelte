<script>
  import { Row, Col } from 'sveltestrap';
  import StationList from '../components/Current/StationList.svelte';
  import PlaceLabel from '../components/Current/PlaceLabel.svelte';
  import GoogleMap from '../api/GoogleMap.svelte';
  import Gurunavi from '../components/Current/Gurunavi.svelte';
</script>
<div class="wrapper">
  <PlaceLabel />
  <Row>
    <Col xs="12" md="4">
      <StationList />
    </Col>
    <Col xs="12" md="8">
      <div style="width:100%;height: 500px;">
        <GoogleMap />
      </div>
      <Gurunavi />
    </Col>
  </Row>
</div>
<style>
</style>