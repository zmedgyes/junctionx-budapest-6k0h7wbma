<template>
  <div class="home">
      <div class="titlebar">
        <VodaLogo size="40px" />
        <div>Welcome back, XYZ!</div>
      </div>
      <div class="homeContent">
        <div class="cardRow">
          <NetCard/>
          <Card width="50%"><h1>Hi</h1></Card>
          <Card width="50%"><h1>Hi</h1></Card>
          <Card width="50%"><h1>Hi</h1></Card>
          <Card width="50%"><h1>Hi</h1></Card>
        </div>
        <div class="cardRow">
          <Card><h1>Hi</h1></Card>
        </div>
      </div>
  </div>
</template>

<script>
import VodaLogo from '../components/VodaLogo.vue'
import Card from '../components/Card.vue'
import NetCard from '../components/cards/NetCard.vue'

export default {
    name: 'Home',
    components: { VodaLogo, Card, NetCard }
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
</style>

