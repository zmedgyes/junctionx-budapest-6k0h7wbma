<template>
  <Card width="100%">
    <div class="cardTitle"><img src="/img/topup.svg"/> Topup</div>
    <div class="cardContent">
      <div class="mybills">Add to balance</div>
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
