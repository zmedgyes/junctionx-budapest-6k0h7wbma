<template>
  <div>
    <div class="google-map" ref="googleMap"></div>
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot
        :google="google"
        :map="map"
      />
    </template>
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader'
import MarkerIcons from "../constants/svgMarkers"
import mapConfig from "../constants/mapConfig"
import { googleApiKey } from "../config/index"
import { listChallenges } from "../remotes/remotes"
import { createTreasueChallenges } from "../remotes/remotes"
export default {
  props: {
    userId:Number
  },

  data() {
    return {
        google: null,
        map: null,
        MarkerIcons,
        mapConfig,
        googleApiKey,
        markers:{},
        initialMarkers:[],
        userCurrentPosition:{"lat":47.497913,"lng":19.040236},
    }
  },
  async mounted() {
     await this.setInitialMarkers()
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.googleApiKey
    })
    this.google = googleMapApi
    this.initializeMap()
  },

  methods: {
    initializeMap() {
        const mapContainer = this.$refs.googleMap
        const youAreHereMarker = this.initialMarkers.find(marker => marker.type == "you-are-here")
        let mapCenter = youAreHereMarker ? youAreHereMarker.position : this.initialMarkers[0].position
        if (mapCenter) {
            this.mapConfig.center = mapCenter
        }
        
        this.map = new this.google.maps.Map(mapContainer, this.mapConfig)
        this.initialMarkers.forEach(marker => {
            let actualMarkerIcon;
            let actualMarkerSize;
            switch (marker.type) {
                case "treasure":
                    actualMarkerIcon = this.MarkerIcons.vodafoneDefaultMarker
                    actualMarkerSize = 30
                    break;
                case "you-are-here":
                    actualMarkerIcon = this.MarkerIcons.youAreHereMarker
                    actualMarkerSize = 20
                    break;
                default:
                    actualMarkerIcon = this.MarkerIcons.vodafoneDefaultMarker
                    actualMarkerSize = 30
                    break;
            }
            let actualMarker = new this.google.maps.Marker({
                position: marker.position,
                map: this.map,
                icon:{ url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(actualMarkerIcon), scaledSize: new this.google.maps.Size(actualMarkerSize, actualMarkerSize) }
            });
            this.markers[marker.id] = {position:marker.position, markerElement:actualMarker}

        });
        //Így lehet markert törölni a térképről
        // this.markers[2].markerElement.setMap(null)
        // this.markers[2].markerElement.setVisible(false)
        // this.markers[<marker id-ja>].markerElement.setMap(null)
    },
    async setInitialMarkers(){
        let challangeList;
        challangeList = await listChallenges(this.userId)
        if (!challangeList.length) {
            await createTreasueChallenges(this.userId,this.userCurrentPosition.lat,this.userCurrentPosition.lng)
            challangeList = await listChallenges(this.userId)
        }
        challangeList.forEach(challange => {
            this.initialMarkers.push({
                position: challange.params,
                type:challange.challenge_type.toLowerCase(),
                id:challange.id
            })
        });
        this.initialMarkers.push({
            position: this.userCurrentPosition,
            type:"you-are-here",
            id:0
        })
    },
    removeMarker(markerId){
        this.markers[markerId].markerElement.setVisible(false)
    }
  },
//   async mounted(){
//       
//   }
}
</script>
<style scoped>
.google-map{
    width:100%;
    height: 400px;
}
</style>
