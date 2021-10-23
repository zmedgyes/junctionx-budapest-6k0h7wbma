<template>
  <Card bg="linear-gradient(301deg, rgb(230, 0, 0), rgb(130, 0, 0))" invertIcon width="100%">
    <div class="cardTitle cwhite"><img src="/img/daily.svg"/> Daily Challange</div>
    <div class="cardContent cwhite">
      <div class="mybills">Complete the Daily Challange!</div>
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

  .cwhite {
    color: var(--brand-white);
  }
</style>
