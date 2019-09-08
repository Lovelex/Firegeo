import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'

// Components
import VueMap from './components/home/Map.vue'
import ViewProfile from './components/profile/ViewProfile.vue'
import Signup from './components/auth/Signup.vue'
import Login from './components/auth/Login.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'Map',
      path: '/',
      component: VueMap,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: 'ViewProfile',
      path: '/profile/:id',
      props: true,
      component: ViewProfile,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: 'Signup',
      path: '/signup',
      component: Signup,
      meta: {
        notAuth: true
      }
    },
    {
      name: 'Login',
      path: '/login',
      component: Login,
      meta: {
        notAuth: true
      }
    },
  ]
})

const isUserLogged = (to, from, next) => {
  // check to see if route requires auth
  if(to.matched.some(rec => rec.meta.requiresAuth)) {
    // check auth state of user
    const user = firebase.auth().currentUser
    if(user) {
      // user signed in, proceed to route
      next()
    } else {
      // no user signed in, redirect to login
      next({ name: 'Login' })
    }
  } else {
    next()
  }
}

const isUserNotLogged = (to, from, next) => {
  // check to see if route requires auth
  if(to.matched.some(rec => rec.meta.notAuth)) {
    // check auth state of user
    const user = firebase.auth().currentUser
    if(!user) {
      // user signed in, proceed to route
      next()
    } else {
      // no user signed in, redirect to login
      next({ name: 'Map' })
    }
  } else {
    next()
  }
}

router.beforeEach(isUserLogged)
router.beforeEach(isUserNotLogged)

export default router