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
import Markers from "../constants/svgMarkers"
export default {
  props: {
    mapConfig: Object,
    apiKey: String,
    markers: Array
  },

  data() {
    return {
        google: null,
        map: null,
        Markers,
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
        this.markers.forEach(marker => {
            new this.google.maps.Marker({
                position: marker.position,
                map: this.map,
                icon:{ url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(this.Markers.vodafoneTestMarker), scaledSize: new this.google.maps.Size(20, 20) }
            });
        });
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
