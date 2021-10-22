<template>
    <GoogleMapLoader
    :mapConfig="mapDefaultConfig"
    :apiKey="googleApiKey"
    :initialMarkers="markers"
    />
    <button @click="removeMarker(2)">Remove second marker</button>
    <button @click="getChallangeList()">Get challange list</button>
    <router-link tag="button" :to="{name : 'Home'}">Home</router-link>
</template>

<script>
import GoogleMapLoader from '../components/GoogleMapLoader.vue'
import mapDefaultConfig from "../constants/mapConfig"
import { googleApiKey } from "../config/index"
import { listChallenges } from "../remotes/remotes"

export default {
    name: 'GoogleMap',
    components: {
        GoogleMapLoader
    },
    data(){
        return{
            mapDefaultConfig,
            googleApiKey,
            markers: [
                {position:{ lat: 47.4858873, lng: 19.077491 }, type:"you-are-here", id:1},
                {position:{ lat: 47.4838873, lng: 19.075491 }, type:"treasure", id:2},
                {position:{ lat: 47.4848873, lng: 19.076491 }, type:"treasure", id:3},
                {position:{ lat: 47.4848873, lng: 19.078491 }, type:"treasure", id:4},
            ]
        }
    },
    methods:{
        removeMarker(markerId){
            this.markers = this.markers.filter(marker => marker.id != markerId)
        },
        async getChallangeList(){
            let result = await listChallenges(1)
            console.log(result)
        }
    },

}
</script>

<style>
#map {
  height: 400px;
  width: 100%;
}
</style>