<template>
    <GoogleMapLoader
    :mapConfig="mapDefaultConfig"
    :apiKey="googleApiKey"
    :initialMarkers="markers"
    />
    <button @click="removeMarker(2)">Remove second marker</button>
</template>

<script>
import GoogleMapLoader from '../components/GoogleMapLoader.vue'
import mapDefaultConfig from "../constants/mapConfig"
import { googleApiKey } from "../config/index"

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
    },

}
</script>

<style>
#map {
  height: 400px;
  width: 100%;
}
</style>