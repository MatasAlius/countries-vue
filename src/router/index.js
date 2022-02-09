import Vue from 'vue'
import VueRouter from 'vue-router'
import Countries from '../components/Countries.vue'
import Cities from '../components/Cities.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Countries',
        component: Countries,
        meta: {
            title: 'Šalys'
        }
    },

    {
        path: '/countries',
        name: 'Countries',
        component: Countries,
        meta: {
            title: 'Šalys',
        }
    },

    {
        path: '/country/:id',
        name: 'Country',
        component: Cities,
        meta: {
            title: 'Šalies miestai',
        }
    },

    {
        path: '/cities',
        name: 'Cities',
        component: Cities,
        meta: {
            title: 'Miestai',
        }
    },

    { path: "*", component: Countries }

]

const router = new VueRouter({
    mode: 'history',
    routes
  })

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
});

export default router