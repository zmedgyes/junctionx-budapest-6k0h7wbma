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
export default {
  props: {
    mapConfig: Object,
    apiKey: String,
    initialMarkers: Array
  },

  data() {
    return {
        google: null,
        map: null,
        MarkerIcons,
        markers:{}
    }
  },

  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey
    })
    this.google = googleMapApi
    this.initializeMap()
  },

  methods: {
    initializeMap() {
        const mapContainer = this.$refs.googleMap
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
            // this.markers.push(actualMarker)
            this.markers[marker.id] = {position:marker.position, markerElement:actualMarker}

        });

        //Így lehet markert törölni a térképről
        // this.markers[2].markerElement.setMap(null)
        // this.markers[<marker id-ja>].markerElement.setMap(null)
    }
  }
}
</script>
<style scoped>
.google-map{
    width:100%;
    height: 400px;
}
</style>
