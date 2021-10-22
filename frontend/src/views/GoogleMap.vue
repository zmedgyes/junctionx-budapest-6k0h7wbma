<template>
    <GoogleMapLoader
    :mapConfig="mapDefaultConfig"
    :apiKey="googleApiKey"
    :markers="markers" 
    />
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
                {position:{ lat: -25.344, lng: 131.036 }},
                {position:{ lat: -27.344, lng: 133.036 }},
                {position:{ lat: -23.344, lng: 129.036 }},
            ]
        }
    }
}
</script>

<style>
#map {
  height: 400px;
  width: 100%;
}
</style>