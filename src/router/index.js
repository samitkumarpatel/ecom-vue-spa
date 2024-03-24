import { createRouter, createWebHistory, useRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      beforeEnter: (to, from) => {
        //TODO try to bring pinia store here to get auth validation
        if(localStorage.getItem('access_token')){
          return true
        }
        return false
      },
    },
    {
      path: '/callback',
      name: 'callback',
      component: () => import('../views/Callback.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => {
        ['id_token', 'access_token','pkace'].forEach(i => localStorage.removeItem(i))
        window.location.href = 'http://localhost:8080/logout'
      }
    }
  ]
})

export default router
