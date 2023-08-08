import { createRouter, createWebHistory } from 'vue-router'
import GetClientsView from "../views/GetClientsView.vue";
import CreateClientView from "../views/CreateClientView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'GetClients',
      component: GetClientsView
    },
    {
      path: '/create',
      name: 'CreateClient',
      component: CreateClientView
    }
  ]
})

export default router
