<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link class="brand-logo" :to="{ name: 'Map'}">
          Fire Geo
        </router-link>
        <ul class="right">
          <li v-if="!isUserLogged()"><router-link :to="{ name: 'Signup' }">Signup</router-link></li>
          <li v-if="!isUserLogged()"><router-link :to="{ name: 'Login' }">Login</router-link></li>
          <li v-if="isUserLogged()"><a @click="logout">Logout</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init.js'
import slugify from 'slugify'

export default {
  name: "Navbar",
  data() {
    return {
      
    }
  },

  methods: {
    isUserLogged() {
      return firebase.auth().currentUser
    },
    logout() {
      firebase.auth().signOut()
        .then(() => {
          this.$router.push({ name: 'Login' })
        })
    }
  }
};
</script>

<style>
</style>