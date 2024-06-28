import { createRouter, createWebHistory } from 'vue-router'
import UserForm from '../views/UserForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: UserForm
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/UserForm.vue')
    },
    {
      path: '/flow',
      name: 'flow',
      component: () => import('../Editor/Index.vue')
    },
  ]
})

export default router
