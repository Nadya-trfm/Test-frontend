import { createRouter, createWebHistory } from 'vue-router'
import GetClientsView from "../views/GetClientsView.vue";
import CreateClientView from "../views/CreateClientView.vue";
import UpdateClientView from "../views/UpdateClientView.vue";

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
    },
    {
      path: '/update/:id',
      name: 'UpdateClient',
      component: UpdateClientView
    }
  ]
})

export default router
