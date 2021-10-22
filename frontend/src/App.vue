<template>
  <div id="nav">
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid mr-1r">
    <a class="navbar-brand" href="#"><router-link :to="{name : 'Home' }"><img class="logo-img" src="@/assets/sample-logo.svg"></router-link></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
      <ul class="navbar-nav ">
        <li class="nav-item">
          <router-link :to="{name : 'Sample' }" class="nav-link">Sample</router-link>
        </li>
        <li>
          <router-link :to="{name : 'GoogleMap' }" class="nav-link">Map</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  </div>
  <router-view/>
  <Loader v-if="isLoaderOn"/>
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
.logo-img{
    height: 40px;
}
</style>
