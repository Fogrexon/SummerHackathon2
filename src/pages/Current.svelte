<script>
  import { Row, Col } from 'sveltestrap';
  import StationList from '../components/Current/StationList.svelte';
  import PlaceLabel from '../components/Current/PlaceLabel.svelte';
</script>
<div class="wrapper">
  <PlaceLabel />
  <Row>
    <Col xs="12" md="4">
      <StationList />
    </Col>
    <Col xs="12" md="8">
      This.is right column
    </Col>
  </Row>
</div>
<style>
</style>