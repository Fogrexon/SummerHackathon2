<script>
  import { Jumbotron, Container } from 'sveltestrap';
</script>

<Jumbotron>
  <h1>
    Welcome to hacktrip!!!
  </h1>
</Jumbotron>
<Container>
  <p>
    This page is categorised into portalsite for planing.
  </p>
  <p class="tips">
    <strong>
    You can see "where you are", "How's the weather like", "what can you eat & enjoy" on this page.
    </strong>
  </p>
  
  <strong class="justdoit">
    JUST OPEN THE NAVIGATION BAR ON THE RIGHT TOP AND CLICK "current location"!!!!!!
  </strong>
  <p class="topics">    <i class="fas fa-map-marked-alt"></i>     <i class="fas fa-cloud-sun"></i>     <i class="fas fa-utensils"></i>     <i class="fas fa-subway"></i></p>
</Container>

<style>
  .justdoit{
    font-size: 40px;
  }
  .tips{
    font-size: 25px;
  }
  .topics{
    display: flex;
    font-size: 180px;
    justify-content: space-around;

  }
</style>