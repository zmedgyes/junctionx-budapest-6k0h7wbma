<template>
    <div>
        <QRScan v-if="!QRclosed" @closeQR="onCloseQR" />
        <GoogleMapLoader
        :mapConfig="mapDefaultConfig"
        :apiKey="googleApiKey"
        :initialMarkers="markers" 
        />
    </div>
</template>

<script>
import QRScan from '../components/QRScan.vue'
import GoogleMapLoader from '../components/GoogleMapLoader.vue'
import mapDefaultConfig from "../constants/mapConfig"
import { googleApiKey } from "../config/index"

export default {
    name: 'GoogleMap',
    components: {
        GoogleMapLoader, QRScan
    },
    data(){
        return{
            mapDefaultConfig,
            googleApiKey,
            markers: [
                {position:{ lat: 47.4858873, lng: 19.077491 }, type:"you-are-here", id:1},
                {position:{ lat: 47.4838873, lng: 19.075491 }, type:"treasure", id:2},
                {position:{ lat: 47.4848873, lng: 19.076491 }, type:"treasure", id:3},
            ],
            QRclosed: false
        }
    },
    methods: {
        onCloseQR() {
            this.QRclosed = true
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