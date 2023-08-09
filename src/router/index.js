import {createRouter, createWebHistory} from 'vue-router'
import GetClientsView from "../views/GetClientsView.vue";
import CreateClientView from "../views/CreateClientView.vue";
import CreateClientCarsView from "../views/CreateClientCarsView.vue";
import UpdateClientView from "../views/UpdateClientView.vue";
import CarsParkedView from "../views/CarsParkedView.vue";

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
            path: '/createWithCar/:id',
            name: 'CreateClientWithCar',
            component: CreateClientCarsView
        },
        {
            path: '/update/:id',
            name: 'UpdateClient',
            component: UpdateClientView
        }, {
            path: '/carsParked',
            name: 'CarsParked',
            component: CarsParkedView
        }
    ]
})

export default router
