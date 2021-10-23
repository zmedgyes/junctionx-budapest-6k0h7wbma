import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Sample from '../views/Sample.vue'
import GoogleMap from '../views/GoogleMap.vue'
import NotFound from '../views/NotFound.vue'
import PointShop from '../views/PointShop.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sample',
    name: 'Sample',
    component: Sample
  },
  {
    path: '/map',
    name: 'GoogleMap',
    component: GoogleMap
  },
  {
    path: '/pointshop',
    name: 'PointShop',
    component: PointShop
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },

]

routes.forEach(routeItem =>{ routeItem['props'] = true })

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
