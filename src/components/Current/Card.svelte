<script>
  export let name = '';
  export let url = '';
  export let category = '';
</script>

<li class="restaurant">
  <h5>{name}
  {#if url}
    <a href={url}><i class="fas fa-link link"></i></a>
  {/if}
  </h5>
  <h6>{category}</h6>
</li>

<style>
  .restaurant {
    display: inline-block;
    min-width: 100px;
    height: 100px;
    margin: 8px;
    padding: 16px;
    border: 1px solid #ddd;
    
    border-radius: 5px;
    transition: 0.2s;
    transform: scale(1);
  }
  .restaurant:hover {
    transform: scale(1.02);
  }
  .link {
    color: black;
    opacity: 0;
    transition: 0.2s;
  }
  .restaurant:hover .link {
    opacity: 1;
  }
</style>