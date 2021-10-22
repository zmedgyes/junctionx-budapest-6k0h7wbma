<template>
  <Card>
    <div class="cardTitle"><img src="/img/arrow.svg"/> Net</div>
    <div class="cardContent">
      <div><span class="big">30.5 GB </span><span>of the 50 GB left</span></div>
      <div class="progress">
      <div class="progress-bar" role="progressbar" style="width: 40%"></div>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from '../Card.vue'

export default {
  components: {Card}
}
</script>


<style scoped>
  .cardTitle {
    
  }
  .cardTitle img {
    height: 18px;
    width: 18px;
    margin-bottom: 4px;
  }
  .cardContent {
    font-size: 25px;
  }
  .cardContent .big {
    font-size: 35px;
    font-weight: 500;
  }

  .progress-bar {
    background: var(--brand-color);
    border-radius: 25px;
  }

  .progress {
    border-radius: 25px;
    height: 0.65rem;
  }
</style>
