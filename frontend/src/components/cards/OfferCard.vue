<template>
  <div>
  <ExchangeConfirm @close="exchangeConfirmed" :offer="offer" :cost="cost" :amount="amount" :isData="isData" v-if="confirmOpen" />
  <Card width="100%" @click="open">
    <div class="cardInner">
      <div class="cardTitle"><img :src="imgSrc"/></div>
      <div class="cardContent">
        <div class="big">{{offer}}</div>
        <div>{{cost}} points</div>
      </div>
      <div class="svg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M 4.84375 12.90625 L 2.75 15 L 25 37.25 L 47.25 15 L 45.15625 12.90625 L 25 33.0625 Z"></path></svg>
      </div>
    </div>
  </Card>
  </div>
</template>

<script>
import { buyShopItem } from '../../remotes/remotes';
import { USER_ID } from '../../misc/user';
import Card from '../Card.vue'
import ExchangeConfirm from '../ExchangeConfirm.vue'

export default {
  components: {Card, ExchangeConfirm},
    props: {
    offerId: {
      type: Number
    },
    imgSrc: {
      type: String
    },
    offer: {
      type: String
    },
    offerType: {
      type: String
    },
    cost: {
      type: Number
    },
    amount: {
      type: String
    }
  },
  computed: {
    isData() {
      return this.offerType === 'DATA';
    },
    cssProps() {
      return {
        '--imgSrc': this.imgSrc
      }
    }
  },
  data() { return {
    confirmOpen: false
  }},
  methods: {
    open() {
      this.confirmOpen = true
    },
    async exchangeConfirmed() {
      const { success } = await buyShopItem(USER_ID, this.offerId);
      console.log('TODO: BUY FAILED');
      this.confirmOpen = false
    }
  }
}
</script>


<style scoped>
  .cardInner {
    height: 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
  }
  .cardTitle img {
    height: 90%;
    width: auto;
  }
  .cardTitle {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .cardContent {
    font-size: 18px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .cardContent .big {
    font-size: 20px;
    font-weight: bold;
  }

  .cardContent > div {
    margin-left: 15px;
  }

  .cardContent .bigish {
    font-size: 30px;
    font-weight: 500;
  }

  .svg {
    height: 50px;
    width: 50px;
    transform: rotate(270deg);
  }
  .svg svg {
    fill: var(--brand-color);
  }
</style>
