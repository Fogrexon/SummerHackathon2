<script>
  import { Row, Col } from 'sveltestrap';
  import Weather from '../components/Current/Weather.svelte';
  import StationList from '../components/Current/StationList.svelte';
  import PlaceLabel from '../components/Current/PlaceLabel.svelte';
  import GoogleMap from '../api/GoogleMap.svelte';
  import Gurunavi from '../components/Current/Gurunavi.svelte';
  import Yahoo from '../components/Current/Yahoo.svelte';
</script>

<div class="wrapper">
  <Row>
    <Col xs="12" md="4">
      <PlaceLabel />
      <Weather/>
      <StationList />
    </Col>
    <Col xs="12" md="8">
      <div style="width:100%;height:400px;">
        <GoogleMap />
      </div>
      <Gurunavi />
      <Yahoo />
    </Col>
  </Row>
</div>
<style>
  .wrapper {
    width: 100%;
    margin: 0px;
    padding: 0px 10px;
  }
</style>
