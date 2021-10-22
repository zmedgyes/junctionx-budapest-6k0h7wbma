<template>
    <QRScan v-if="!QRclosed" @closeQR="onCloseQR" />
    <GoogleMapLoader ref="mapLoader" :userId="userId"/>
    <button @click="$refs.mapLoader.removeMarker(2)">Remove second marker</button>
    <button @click="QRclosed=false">Open</button>
    <router-link tag="button" :to="{name : 'Home'}">Home</router-link>
</template>

<script>
import QRScan from '../components/QRScan.vue'
import GoogleMapLoader from '../components/GoogleMapLoader.vue'

export default {
    name: 'GoogleMap',
    components: {
        GoogleMapLoader, QRScan
    },
    data(){
        return{
            userId: 1,
            QRclosed: true
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