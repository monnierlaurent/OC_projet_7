import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import home from '../views/home.vue'


Vue.use(VueRouter)



const routes = [{
        path: '/',
        name: 'home',
        component: home,
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/login.vue')

    },
    {
        path: '/signup',
        name: 'signup',
        component: () =>
            import ('../views/signup.vue')
    },
    {
        path: '/forum',
        name: 'forum',
        component: () =>
            import ('../views/forum.vue')
    }


];

const router = new VueRouter({
    routes
})

export default router