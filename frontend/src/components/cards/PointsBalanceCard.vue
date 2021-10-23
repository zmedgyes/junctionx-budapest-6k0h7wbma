<template>
  <Card width="100%">
    <div class="cardTitle"><img src="/img/vodapoint.svg"/> Voda Point Balance</div>
    <div class="cardContent">
      <div><span class="big">{{ points }}</span> <span class="bigish">Pts</span></div>
      <div class="due">available until: 2021.12.11.</div>
    </div>
  </Card>
</template>

<script>
import { User, USER_ID } from '../../misc/user'
import { getPoints } from '../../remotes/remotes'
import Card from '../Card.vue'

export default {
  components: {Card},
  data() {
    return {
      points: 35
    }
  },
  async mounted() {
    this.points = (await getPoints(USER_ID)).points;
  }
}
</script>


<style scoped>
  .cardTitle img {
    height: 18px;
    width: 18px;
    margin-bottom: 5px;
  }
  .cardContent {
    font-size: 25px;
  }
  .cardContent .big {
    font-size: 35px;
    font-weight: 500;
    margin-left: 20px;
  }

  .cardContent .bigish {
    font-size: 30px;
    font-weight: 500;
  }

  .due {
    font-size: 17px;
    color: var(--brand-lightgrey);
    text-align: end;
  }

  .mybills {
    font-size: 20px;
  }
</style>
