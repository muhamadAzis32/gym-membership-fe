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
    {
        path: '/pelanggan',
        name: 'pelanggan.index',
        component: () => import( /* webpackChunkName: "index" */ '../views/pelanggan/index.vue')
    },
    {
        path: '/membership',
        name: 'membership.index',
        component: () => import( /* webpackChunkName: "index" */ '../views/membership/index.vue')
    },
    {
        path: '/kelas-gym',
        name: 'kelas.index',
        component: () => import( /* webpackChunkName: "index" */ '../views/kelas/index.vue')
    },
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes // <-- routes,
})

export default router