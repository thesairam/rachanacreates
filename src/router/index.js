import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Design from '../views/Design.vue'
import Contact from '../views/Contact.vue'
import Pricing from '../views/Pricing.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/designs', name: 'Design', component: Design },
  { path: '/pricing', name: 'Pricing', component: Pricing },
  { path: '/contact', name: 'Contact', component: Contact }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
