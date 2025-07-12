//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import( /* webpackChunkName: "home" */ '../views/home.vue')
    },
    {
        path: '/booking',
        name: 'booking.index',
        component: () => import( /* webpackChunkName: "index" */ '../views/booking/index.vue')
    },
    {
        path: '/create',
        name: 'booking.create',
        component: () => import( /* webpackChunkName: "create" */ '../views/booking/create.vue')
    },
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes // <-- routes,
})

export default router