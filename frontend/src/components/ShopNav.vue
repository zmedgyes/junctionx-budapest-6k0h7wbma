<template>
  <div class="shopnav">
    <div class="sbox sinv"></div>
    <div class="stitle"><h2>Exchange Voda Points</h2></div>
    <!-- <div class="sclose sbox"></div> -->
    <router-link @click='emitClose' class="sclose sbox" tag="div" :to="{name : exitTo}" />
  </div>
</template>

<script>
export default {
  emits: ['close'],
  methods:{
    emitClose(){
      this.$emit('close')
    }
  },
  props: {
    exitTo: {
      type: String,
      default: 'Home'
    }
  }
}
</script>

<style scoped>
.nooffers {
    padding: 30px;
    font-size: 18px;
}
.shopnav {
    height: 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
}

.stitle {
    font-weight: 500;
}

.stitle h2 {
    margin: 0;
}

.sclose {
    position: relative;
}

.sbox {
    height: 50px;
    width: 50px;
}

.sinv {
    visibility: hidden;
}

.sclose::after {
    font-weight: 300;
    content: '\d7';
    position: absolute;
    top: -25px;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 75px; 
    color: var(--brand-black);
    line-height: 100px;
    text-align: center;
}
</style>
