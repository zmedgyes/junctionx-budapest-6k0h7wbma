<template>
  <div class="home">
      <div class="titlebar">
        <VodaLogo size="40px" />
        <div>Welcome back, Alex!</div>
      </div>
      <div class="homeContent">
        <div class="cardRow">
          <NetCard />
          <BillCard />
          <div class="topdaily">
            <TopUpCard />
            <DailyCard />
          </div>
        </div>
        <h2>
          Discovery
        </h2>
        <div class="cardRow">
          <router-link class="maplink" tag="button" :to="{name : 'GoogleMap'}"><MapCard /></router-link>
        </div>
      </div>
  </div>
</template>

<script>
import VodaLogo from '../components/VodaLogo.vue'
import Card from '../components/Card.vue'
import NetCard from '../components/cards/NetCard.vue'
import BillCard from '../components/cards/BillCard.vue'
import TopUpCard from '../components/cards/TopUpCard.vue'
import MapCard from '../components/cards/MapCard.vue'
import DailyCard from '../components/cards/DailyCard.vue'

export default {
    name: 'Home',
    components: { VodaLogo, Card, NetCard, BillCard,
      TopUpCard, MapCard, DailyCard },
    mounted(){
      this.$store.dispatch('activateLoader')
      let randomLoadingTime = Math.floor((Math.random()*2000)+800);
      setTimeout(() =>{ 
        this.$store.dispatch('deActivateLoader')
       }, randomLoadingTime);
    }
  }

</script>
<style scoped>
.cardRow {
  display: flex;
  flex-wrap: wrap;
}
.homeContent {
  padding: 5px 20px;
}
.titlebar {
    height: 75px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 20px;
    font-size: 20px;
}

h2 {
  font-weight: bold;
  margin: 6px 0px 0px 6px;
}

.maplink {
  width: 100%;
}

.topdaily {
  display: flex;
  flex-direction: column;
  width: 50%;
}
</style>

