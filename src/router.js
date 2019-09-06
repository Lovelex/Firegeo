import Vue from 'vue'
import Router from 'vue-router'

// Components
import VueMap from './components/home/Map.vue'
import Profile from './components/Profile.vue'
import Signup from './components/auth/Signup.vue'
import Login from './components/auth/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'Map',
      path: '/',
      component: VueMap
    },
    {
      name: 'Profile',
      path: '/profile/:slug',
      component: Profile
    },
    {
      name: 'Signup',
      path: '/signup',
      component: Signup
    },
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
  ]
})
