<template>
  <Card class="mapCard">
    <div class="cardContent">
      <div class="bigdiv"><span class="big">Open map game</span></div>
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
  .mapCard >>> div {
    background: var(--brand-gradient);
  }
  .bigdiv {
    padding-left: 10px;
    padding-top: 15px;
    background: transparent !important;
  }
  .cardTitle img {
    height: 18px;
    width: 18px;
  }
  .cardContent {
    font-size: 25px;
    color: var(--brand-white);
    min-height: 140px;
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
