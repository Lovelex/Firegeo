<template>
  <div class="map">
    <div class="google-map" id="map"></div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: "Map",
  data() {
    return {
      lat: 53,
      lng: -2
    };
  },

  methods: {
    renderMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: this.lat, lng: this.lng },
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false
      });
    }
  },

  mounted() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lat = pos.coords.latitude
        this.lng = pos.coords.longitude
      }, (err) => {
        console.log(err)
        this.renderMap()
      }, { maximumAge: 60000, timeout: 3000 })
    } else {
      this.renderMap()
    }
  }
};
</script>
<style>
.google-map {
  position: absolute;
  background: #fff;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>