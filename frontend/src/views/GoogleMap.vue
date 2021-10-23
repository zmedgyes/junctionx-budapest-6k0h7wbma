<template>
    <div class="designLineTop"></div>
    <UserMessagee v-if="userMessage.isVisible"
    :userMessageInfo="userMessage"
    @closeUserMessage="closeMessage"/>
    <QRScan v-if="!QRclosed"
     @closeQR="onCloseQR"
     @onQRDecode="onQRScan" />
    <GoogleMapLoader ref="mapLoader" @onMarkerClick="startQrScanByMarker"/>
    <!-- <button @click="$refs.mapLoader.removeMarker(2)">Remove second marker</button>
    <button @click="QRclosed=false">Open</button>
    <router-link tag="button" :to="{name : 'Home'}">Home</router-link> -->
</template>

<script>
import QRScan from '../components/QRScan.vue'
import UserMessagee from '../components/UserMessagee.vue'
import GoogleMapLoader from '../components/GoogleMapLoader.vue'
import { verifyTreasure } from "../remotes/remotes"
import { User, USER_ID } from "../misc/user"
import { getCurrentPosition } from '../misc/geolocation'

export default {
    name: 'GoogleMap',
    components: {
        GoogleMapLoader, QRScan, UserMessagee
    },
    data(){
        return{
            QRclosed: true,
            userMessage:{
                isVisible:false,
                mainMessage:"This is some messgage",
                subMessage:"Damn thats a pretty good submesssage",
                icon:"success"
            },
            recentMarkerInfo:{
                markerId:null,
                position:null
            }
        }
    },
    methods: {
        onCloseQR() {
            this.QRclosed = true
        },
        closeMessage(){
            this.userMessage.isVisible = false
        },
        async onQRScan(payload){
            this.QRclosed = true
            await this.handleScannedQr(payload)
        },
        startQrScanByMarker(payload){
            this.recentMarkerInfo.markerId = payload.markerId
            this.recentMarkerInfo.position= payload.markerPosition
            this.QRclosed = false

        },
        async handleScannedQr(payload){
            if (payload.success) {
                const { lat, lng } = await getCurrentPosition();
                // const verifyQRResult = await verifyTreasure(User.Id,lat,lng,payload.QRContent)
                const verifyQRResult = await verifyTreasure(USER_ID,lat,lng,payload.QRContent, this.recentMarkerInfo.markerId)
                if (verifyQRResult.success) {
  
                    if (this.recentMarkerInfo.markerId) {
                        this.$refs.mapLoader.removeMarker(this.recentMarkerInfo.markerId)
                    }
                    this.userMessage.mainMessage = 'Treasurehunt is successfull!'
                    if (verifyQRResult.points) {
                        this.userMessage.subMessage = `You got extra ${verifyQRResult.points} Vodafone points!`
                    }else{
                        this.userMessage.subMessage = 'Your vodafone points are credited to your account'
                    }
                    this.userMessage.icon = 'success'
                    
                }else{
                    this.userMessage.mainMessage = 'The scanned QR is not active'
                    this.userMessage.subMessage = 'Please try to scan another treasure QR codes'
                    this.userMessage.icon = 'error'

                }
            }else{
                this.userMessage.mainMessage = 'QR scanning has failed'
                this.userMessage.subMessage = 'Please try again'
                this.userMessage.icon = 'error'
            }
            this.userMessage.isVisible = true;
        }
    }

}
</script>

<style>
#map {
  height: 400px;
  width: 100%;
}
.designLineTop{
    position: fixed;
    width: 100vw;
    height: 4px;
    top:0;
    margin: 0;
    padding: 0;
    background-color: var(--brand-color);
    z-index: 6000;
}
</style>