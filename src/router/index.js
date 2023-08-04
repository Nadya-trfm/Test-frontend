import { createRouter, createWebHistory } from 'vue-router'
import GetClientsView from "../views/GetClientsView.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'GetClients',
      component: GetClientsView
    }
  ]
})

export default router
