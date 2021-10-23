<template>
  <div class="home">
      <div class="titlebar">
        <VodaLogo size="40px" />
        <div>Welcome back, Alex!</div>
      </div>
      <div class="homeContent">
        <div class="cardRow">
          <Card
          bg="#f59999" style="text-align:center" class="streak-notification" v-if="isNotificationOn">
            <span style="color:white; font-weight:bold">1st day streak is pretty nice!</span>
          </Card>
        </div>
        <div class="cardRow">
          <NetCard
          :dataBalance="dataBalance" />
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
import { User } from '../misc/user';

export default {
    name: 'Home',
    components: { VodaLogo, Card, NetCard, BillCard,
      TopUpCard, MapCard, DailyCard },
    data(){
        return{
          dataBalance:null,
          isNotificationOn:true
        }
    },
    async mounted(){
      this.$store.dispatch('activateLoader')
      await User.initUser(1);
      this.dataBalance = User.data.dataBalance
      let randomLoadingTime = Math.floor((Math.random()*1300)+400);
      setTimeout(() =>{ 
        this.$store.dispatch('deActivateLoader')
       }, randomLoadingTime);
       setTimeout(()=>{
         this.isNotificationOn = false
        }, 3000);
    }
  }

</script>
<style scoped>
.notification{
    z-index: 5000;
    position: fixed;
    top: 1%;
    left: 2%;
    width: 96vw;
}
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

/* .streak-notification {
  animation: fadeIn 5s;
  -webkit-animation: fadeIn 5s;
  -moz-animation: fadeIn 5s;
  -o-animation: fadeIn 5s;
  -ms-animation: fadeIn 5s;
}
@keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@-moz-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@-webkit-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@-o-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@-ms-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
} */
</style>

