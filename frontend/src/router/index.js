import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Sample from '../views/Sample.vue'
import GoogleMap from '../views/GoogleMap.vue'
import NotFound from '../views/NotFound.vue'

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
