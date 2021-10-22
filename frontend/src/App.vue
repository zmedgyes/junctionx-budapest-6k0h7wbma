<template>
<div class="appRoot">
  <router-view/>
  <Loader v-if="isLoaderOn"/>
  </div>
</template>


<script>
import Loader from './components/Loader.vue'

export default {
    name: 'App',
    components : { Loader },
    computed:{
      isLoaderOn(){
        return this.$store.state.isLoaderOn;
      },
    },
}
</script>

<style>
:root {
  --brand-gradient: linear-gradient(301deg, rgb(230, 0, 0), rgb(130, 0, 0));
  --brand-color: #e60000;
  --brand-paper: #f4f4f4;
  --brand-black: #333333;
  --brand-white: #fff;
}

html > body {
  font-family: 'Vodafone';
  background: var(--brand-paper);
  color: var(--brand-black);
}

@font-face {
  font-family: 'Vodafone';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts/vodafone-regular.woff) format('woff');
}

@font-face {
  font-family: 'Vodafone';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(/fonts/vodafone-bold.woff) format('woff');
}

@font-face {
  font-family: 'Vodafone';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(/fonts/vodafone-light.woff) format('woff');
}

.logo-img{
    height: 40px;
}
</style>
