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
import { getCurrentPosition } from "../misc/geolocation"
import { EventBus } from "../misc/event-bus"
import { User, USER_ID } from "../misc/user"
export default {
  props: {
  },
  emits: ["onMarkerClick"],
  data() {
    return {
        google: null,
        map: null,
        MarkerIcons,
        mapConfig,
        googleApiKey,
        markers:{},
        initialMarkers:[]
    }
  },
  async mounted() {
     await this.setInitialMarkers()
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.googleApiKey
    })
    this.google = googleMapApi
    this.initializeMap()
    EventBus.$on('rushCompleted', this._rushCompleted.bind(this));
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
                case "rush":
                    actualMarkerIcon = this.MarkerIcons.vodafoneHighlightedMarker
                    actualMarkerSize = 60
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
                animation: (marker.type === 'rush') ? this.google.maps.Animation.BOUNCE : undefined,
                icon:{ url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(actualMarkerIcon), scaledSize: new this.google.maps.Size(actualMarkerSize, actualMarkerSize) }
            });
            if (marker.type == "treasure") {
              this.google.maps.event.addListener(actualMarker,'click',()=>{this.scanMarkerQR(marker.id,marker.position)})
            }
            
            this.markers[marker.id] = {type: marker.type, position:marker.position, markerElement:actualMarker}

            const bounds = new this.google.maps.LatLngBounds();
            Object.values(this.markers).forEach((markerRecord) => {
              
              bounds.extend(new this.google.maps.LatLng(markerRecord.position.lat, markerRecord.position.lng));
            });
            this.map.fitBounds(bounds);
        });
        //Így lehet markert törölni a térképről
        // this.markers[2].markerElement.setMap(null)
        // this.markers[2].markerElement.setVisible(false)
        // this.markers[<marker id-ja>].markerElement.setMap(null)
    },
    async setInitialMarkers(){
        const userCurrentPosition = await getCurrentPosition();
        let challangeList = await this._getMarkerChallenges();
        if (challangeList.length <= 2) {
            await createTreasueChallenges(USER_ID,userCurrentPosition.lat,userCurrentPosition.lng)
            challangeList = await this._getMarkerChallenges();
        }
        challangeList.forEach(challange => {
            this.initialMarkers.push({
                position: challange.params,
                type:challange.challenge_type.toLowerCase(),
                id:challange.id
            })
        });
        this.initialMarkers.push({
            position: userCurrentPosition,
            type:"you-are-here",
            id:0
        })
    },
    async _getMarkerChallenges() {
      const challangeList = await listChallenges(USER_ID);
      return challangeList.filter(challange => challange.challenge_type === 'TREASURE' || challange.challenge_type === 'RUSH');
    },
    _rushCompleted() {
      Object.keys(this.markers).forEach((markerId) => {
        if(this.markers[markerId].type === 'rush') {
          this.removeMarker(markerId);
        }
      });
    },
    scanMarkerQR(markerId, markerPosition){
      this.$emit('onMarkerClick',{markerId,markerPosition})
    },
    removeMarker(markerId){
        this.markers[markerId].markerElement.setVisible(false)
        this.markers[markerId].markerElement.setMap(null)
        delete this.markers[markerId]
    }
  },
//   async mounted(){
//       
//   }
}
</script>
<style scoped>
.google-map{
    margin-bottom: -50px;
    width:100vw;
    height: 100vh;
}
</style>
