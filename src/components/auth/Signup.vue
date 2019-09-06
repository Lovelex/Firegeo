<template>
  <div class="signup container">

    <form @submit.prevent="signup" class="card-panel">
      <h2 class="center deep-purple-text">Signup</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="text" v-model.trim="user.email" name="email" id="email">
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" v-model="user.password" name="password" id="password">
      </div>
      <div class="field">
        <label for="alias">Alias:</label>
        <input type="text" v-model.trim="user.alias" name="alias" id="alias">
      </div>
      <div class="field center">
        <p class="red-text" v-if="feedback">{{ feedback }}</p>
        <button class="btn deep-purple">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init.js'
import firebase from 'firebase'
import slugify from 'slugify'

export default {
  name: 'Signup',
  data() {
    return {
      user: {},
      feedback: '',
      slug: ''
    }
  },

  methods: {
    validateInputs(user) {
      if(!user.email) return this.feedback = 'Email cannot be empty!'
      if(!user.password) return this.feedback = 'Password cannot be empty!'
      if(!user.alias) return this.feedback = 'Alias cannot be empty!'
    },

    signup() {
      if(this.validateInputs(this.user)) return 
      this.slug = slugify(this.user.alias, {
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: true
      })
      const ref = db.collection('users').doc(this.slug)
      ref.get().then(doc => {
         if(!doc.exists){
           firebase.auth()
            .createUserWithEmailAndPassword(this.user.email, this.user.password)
            .then(cred => {
              console.log('CRED_LOG:', cred)
              ref.set({
                alias: this.user.alias,
                geolocation: null,
                user_id: cred.user.uid
              })
            })
            .then(() => {
              this.$router.push({ name: 'Map' })
            })
            .catch(err => {
              console.log(err)
              this.feedback = err.message
            })
            this.feedback = 'This alias can be used!'
         }else {
           this.feedback = 'This alias already exists'
         }
        
      })
      console.log(this.slug)
    }
  }
}
</script>

<style>
  .signup{
    max-width: 400px;
    margin-top: 60px;
  }

  .signup h2 {
    font-size: 2.4em;
  }

  .signup .field {
    margin-bottom: 16px;
  }
</style>