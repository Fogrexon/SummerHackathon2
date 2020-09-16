<script>
  import { Row, Col } from 'sveltestrap';
  import Weather from '../components/Current/Weather.svelte';
</script>
<div class="wrapper">
  <Row>
    <Col xs="6" sm="4">
      This is left column
    </Col>
    <Col xs="12" sm="8">
      This.is right column
    </Col>
  </Row>
</div>
<style>
</style>
<Weather/>