<template>
    <UserMessagee v-if="userMessage.isVisible"
    :userMessageInfo="userMessage"
    @closeUserMessage="closeMessage"/>
    <QRScan v-if="!QRclosed"
     @closeQR="onCloseQR"
     @onQRDecode="onQRScan" />
    <GoogleMapLoader ref="mapLoader" :userId="userId"
    @onMarkerClick="startQrScanByMarker"/>
    <!-- <button @click="$refs.mapLoader.removeMarker(2)">Remove second marker</button>
    <button @click="QRclosed=false">Open</button>
    <router-link tag="button" :to="{name : 'Home'}">Home</router-link> -->
</template>

<script>
import QRScan from '../components/QRScan.vue'
import UserMessagee from '../components/UserMessagee.vue'
import GoogleMapLoader from '../components/GoogleMapLoader.vue'
import { verifyTreasure } from "../remotes/remotes"

export default {
    name: 'GoogleMap',
    components: {
        GoogleMapLoader, QRScan, UserMessagee
    },
    data(){
        return{
            userId: 1,
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
                const verifyQRResult = await verifyTreasure(this.userId,49.111,19.234,payload.QRContent)
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
                    this.userMessage.subMessage = 'Please try to scan another trasure QR codes'
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
</style>