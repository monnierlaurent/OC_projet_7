import Vue from 'vue'
import VueRouter from 'vue-router'
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
    },
    {
        path: '/post',
        name: 'post',
        component: () =>
            import ('../views/post.vue')
    },
    {
        path: '/post/id',
        name: 'postId',
        component: () =>
            import ('../views/postid.vue')
    },

];

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router