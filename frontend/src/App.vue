<template>
<div class="appRoot">
  <!-- <router-view v-slot="{ Component }">
    <transition name="routes" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view> -->
  <router-view/>
  <Loader v-if="isLoaderOn"/>
  <BottomMenu v-if="!isLoaderOn" />
  </div>
</template>


<script>
import Loader from './components/Loader.vue'
import BottomMenu from './components/BottomMenu.vue'
import { PollingService } from './misc/polling';
import { User } from './misc/user';

export default {
    name: 'App',
    components : { Loader, BottomMenu },
    computed:{
      isLoaderOn(){
        return this.$store.state.isLoaderOn;
      },
    },
    async beforeCreated() {
      await User.initUser(1);
    },
    async created(){
      PollingService.startPolling(1000, User.id);
    }
}
</script>

<style>
:root {
  --brand-gradient: linear-gradient(301deg, rgb(230, 0, 0), rgb(130, 0, 0));
  --brand-color: #e60000;
  --brand-paper: #f4f4f4;
  --brand-black: #333333;
  --brand-white: #fff;
  --brand-lightgrey: #5c5c5c;
}

html > body {
  font-family: 'Vodafone';
  background: var(--brand-paper);
  color: var(--brand-black);
  margin-bottom: 75px;
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

/* route transitions */
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active {
  transition: all 0.3s ease-out; 
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.route-leave-active {
  transition: all 0.3s ease-in; 
}
</style>
