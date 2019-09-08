<template>
  <div class="map">
    <div class="google-map" id="map"></div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import db from "@/firebase/init.js";

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
        streetViewControl: true
      })
      db.collection('users').get().then(users => {
        users.docs.forEach(doc => {
          const data = doc.data()
          if(data.geolocation) {
            const marker = new google.maps.Marker({
              position : {
                lat: data.geolocation.lat,
                lng: data.geolocation.lng
              },
              map
            })
            // add click event to marker
            marker.addListener('click', () => {
              this.$router.push({ name: 'ViewProfile', params: { id: doc.id } })
            })
          }
        })
      })
    },

    getUserGeolocation() {
      const user = firebase.auth().currentUser;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          pos => {
            this.lat = pos.coords.latitude;
            this.lng = pos.coords.longitude;

            const ref = db.collection("users");

            ref
              .where("user_id", "==", user.uid)
              .get()
              .then(snapshot => {
                snapshot.forEach(doc => {
                  ref.doc(doc.id).update({
                    geolocation: {
                      lat: pos.coords.latitude,
                      lng: pos.coords.longitude
                    }
                  });
                });
              })
              .then(() => {
                this.renderMap();
              })
              .catch(err => console.log(err));
          },
          err => {
            console.log(err);
            this.renderMap();
          },
          { maximumAge: 60000, timeout: 3000 }
        );
      } else {
        this.renderMap();
      }
    }
  },

  mounted() {
    this.getUserGeolocation();
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