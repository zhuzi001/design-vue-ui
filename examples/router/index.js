import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cascader',
    name: 'cascader',
    component: () => import('../views/cascader')
  },
  {
    path: '/textarea',
    name: 'textarea',
    component: () => import('../views/textarea')
  },
  {
    path: '/input',
    name: 'input',
    component: () => import('../views/input')
  },
  {
    path: '/input-number',
    name: 'input-number',
    component: () => import('../views/input-number')
  },
  {
    path: '/select',
    name: 'select',
    component: () => import('../views/select')
  },
  {
    path: '/multiple-select',
    name: 'select',
    component: () => import('../views/multiple-select')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
