<script>
  import { Row, Col } from 'sveltestrap';
  import StationList from '../components/Current/StationList.svelte';
</script>
<div class="wrapper">
  <Row>
    <Col xs="6" sm="4">
      <StationList />
    </Col>
    <Col xs="12" sm="8">
      This.is right column
    </Col>
  </Row>
</div>
<style>
</style>