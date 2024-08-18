import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
  // {
  //   path: '/table',
  //   name: 'table',
  //   component: () => import('../views/table')
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
