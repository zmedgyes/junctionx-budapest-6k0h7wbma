<template>
  <Card width="100%">
    <div class="cardInner">
      <div class="cardTitle"><img :src="imgSrc"/></div>
      <div class="cardContent">
        <div class="big">a</div>
        <div>ab</div>
      </div>
      <div class="svg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M 4.84375 12.90625 L 2.75 15 L 25 37.25 L 47.25 15 L 45.15625 12.90625 L 25 33.0625 Z"></path></svg>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from '../Card.vue'

export default {
  components: {Card},
    props: {
    imgSrc: {
      type: String
    }
  },
  computed: {
    cssProps() {
      return {
        '--imgSrc': this.imgSrc
      }
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
