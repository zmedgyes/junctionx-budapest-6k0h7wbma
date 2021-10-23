<template>
    <UserMessagee v-if="userMessage.isVisible"
    :userMessageInfo="userMessage"
    @closeUserMessage="closeMessage"/>
    <QRScan v-if="!QRclosed"
     @closeQR="onCloseQR"
     @onQRDecode="onQRScan" />
    <GoogleMapLoader ref="mapLoader" :userId="userId"/>
    <button @click="$refs.mapLoader.removeMarker(2)">Remove second marker</button>
    <button @click="QRclosed=false">Open</button>
    <router-link tag="button" :to="{name : 'Home'}">Home</router-link>
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
                isVisible:true,
                mainMessage:"This is some messgage",
                subMessage:"Damn thats a pretty good submesssage",
                icon:"success"
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
            console.log(payload)
            this.QRclosed = true
            await this.handleScannedQr(payload)
        },
        async handleScannedQr(payload){
            if (payload.success) {
                const verifyQRResult = await verifyTreasure(this.userId,49.111,19.234,payload.QRContent)
                if (verifyQRResult.success) {
                    //remove the selected marker
                    //Tmp marker remove logic
                    //-----------------------------------
                    this.$refs.mapLoader.removeMarker(2)
                    //-----------------------------------
                    //usermessage --> beolvasás sikeres
                }else{
                    //Usermessage --> Nem jó a qr
                }
            }else{
                //usermessage: --> Nem sikerült a qr code beolvasás
            }
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