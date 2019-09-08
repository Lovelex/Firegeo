<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link class="brand-logo" :to="{ name: 'Map'}">
          Fire Geo
        </router-link>
        <ul class="right">
          <li v-if="!user"><router-link :to="{ name: 'Signup' }">Signup</router-link></li>
          <li v-if="!user"><router-link :to="{ name: 'Login' }">Login</router-link></li>
          <li v-if="user">{{user.email}}</li>
          <li v-if="user"><a @click="logout">Logout</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import db from '@/firebase/init.js'
import slugify from 'slugify'

export default {
  name: "Navbar",
  data() {
    return {
      user: null
    }
  },

  methods: {
    isUserLogged() {
      firebase.auth().onAuthStateChanged(user => {
        user
          ? this.user = user
          : this.user = false
        
      })
    },
    logout() {
      firebase.auth().signOut()
        .then(() => {
          this.$router.push({ name: 'Login' })
        })
    }
  },

  created() {
    this.isUserLogged()
  }
};
</script>

<style>
</style>