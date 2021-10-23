<template>
  <div class="home">
      <DailyBox @cancel="this.dailyOverlayOpen = false" v-if="dailyOverlayOpen" />
      <div class="titlebar">
        <VodaLogo size="40px" />
        <div>Welcome back, {{ userFirstName }}!</div>
      </div>
      <div class="homeContent">
        <div class="cardRow">
          <NetCard
          :dataBalance="dataBalance" />
          <BillCard />
          <div class="topdaily">
            <TopUpCard />
            <DailyCard @click="startDaily" />
          </div>
        </div>
        <h2>
          Treasure Hunt
        </h2>
        <div class="cardRow">
          <router-link class="maplink" tag="button" :to="{name : 'GoogleMap'}"><MapCard /></router-link>
        </div>
        <div class="toShop">
          <router-link :to="{name: 'PointShop'}">Exchange Voda Points</router-link>
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
import DailyBox from '../components/DailyBox.vue'
import { USER_ID } from '../misc/user';
import { getUserInfo } from '../remotes/remotes'

export default {
    name: 'Home',
    components: { VodaLogo, Card, NetCard, BillCard,
      TopUpCard, MapCard, DailyCard, DailyBox },
    data(){
        return{
          dailyOverlayOpen: false,
          dataBalance:null,
          userFirstName: 'Alex'
        }
    },
    async mounted(){
      this.$store.dispatch('activateLoader')
      const user = await getUserInfo(USER_ID);
      this.dataBalance = Number(user.data.dataBalance.toFixed(2))
      if(user.data.firstName) {
        this.userFirstName = user.data.firstName;
      }
      let randomLoadingTime = Math.floor((Math.random()*2000)+800);
      setTimeout(() =>{ 
        this.$store.dispatch('deActivateLoader')
       }, randomLoadingTime);
    },
    methods: {
      startDaily() {
        this.dailyOverlayOpen = true
      }
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
.toShop {
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-items: center;
}
.toShop >>> a {
  color: var(--brand-color);
  font-size: 18px;
  white-space: nowrap;
}
</style>

