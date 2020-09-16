<script>
  export let name = '';
  export let url = '';
  export let category = '';
</script>

<div class="restaurant">
  {#if url}
    <h5><a href={url} target="_blank">{name}</a></h5>
  {:else}
    <h5>{name}</h5>
  {/if}
  <h6>{category}</h6>
</div>

<style>
  .restaurant {
    width: 200px;
    height: 50px;
    display: inline-block;
  }
</style>