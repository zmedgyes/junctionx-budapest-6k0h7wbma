<template>
  <Card width="50%">
    <div class="cardTitle"><img src="/img/arrow.svg"/> Next Bill</div>
    <div class="cardContent">
      <div class="mybills">My bills amount</div>
      <div><span class="big">30 000</span> <span class="bigish">Ft</span></div>
      <div class="due">due date: 2021.11.02.</div>
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
    height: 12px;
    width: 12px;
  }
  .cardContent {
    font-size: 25px;
  }
  .cardContent .big {
    font-size: 35px;
    font-weight: 500;
  }

  .cardContent .bigish {
    font-size: 30px;
    font-weight: 500;
  }

  .due {
    font-size: 20px;
    color: var(--brand-lightgrey);
  }

  .mybills {
    font-size: 20px;
  }
</style>
