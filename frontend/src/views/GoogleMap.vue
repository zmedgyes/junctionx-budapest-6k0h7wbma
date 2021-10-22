<template>
    <GoogleMapLoader ref="mapLoader" :userId="userId"/>
    <button @click="$refs.mapLoader.removeMarker(2)">Remove second marker</button>
    <router-link tag="button" :to="{name : 'Home'}">Home</router-link>
</template>

<script>
import GoogleMapLoader from '../components/GoogleMapLoader.vue'

export default {
    name: 'GoogleMap',
    components: {
        GoogleMapLoader
    },
    data(){
        return{
            userId:1,
        }
    },
    methods:{

    },

}
</script>

<style>
#map {
  height: 400px;
  width: 100%;
}
</style>