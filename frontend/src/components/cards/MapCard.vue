<template>
  <Card class="mapCard">
    <div class="cardContent">
      <div class="bigdiv"><span class="big">Go to map game!</span></div>
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
    max-width: 50%;
  }
  .cardTitle img {
    height: 18px;
    width: 18px;
  }
  .cardContent {
    font-size: 25px;
    color: var(--brand-white);
    min-height: 140px;
    position: relative;
  }
  .cardContent .big {
    font-size: 27px;
    font-weight: 500;
  }

  .cardContent::after {
    content: ' ';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: url('/img/map-promo.png');
    background-repeat: no-repeat;
    background-size: 65%;
    background-position: right;
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
