<template>
  <div class="login container">
    <form @submit.prevent="login" class="card-panel">
      <h2 class="center deep-purple-text">Login</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="text" v-model.trim="user.email" name="email" id="email">
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" v-model="user.password" name="password" id="password">
      </div>
      <div class="field">
        <p v-if="feedback" class="red-text center">{{ feedback }}</p>
        <button class="btn deep-purple">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/app'

export default {
  name: 'Login',
  data() {
    return {
      user: {},
      feedback: ''
    }
  },

  methods: {
    login() {
      if(!this.user.email || !this.user.password) {
        this.feedback = 'Email and Password cannot be empty!'
        return
      }
      this.feedback = ''
      firebase.auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(cred => {
          this.$router.push({ name: 'Map' })
        })
        .catch(err => {
          console.log(err)
          this.feedback = err.message
        })
    }
  }
}
</script>

<style>
  .login {
    max-width: 400px;
    margin-top: 60px;
  }
  .login h2 {
    font-size: 2.4em
  }
  .login .field {
    margin-bottom: 16px;
  }
</style>