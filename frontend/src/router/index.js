import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

let l_router = null

const router = () => {
  const authStore = useAuthStore(),
    ifNotAuthorized = (_to, _from, next) => {
      if (authStore.isNotAuthorized) {
        next()
      } else {
        next({ name: 'home' })
      }
    },
    ifAuthorized = (_to, _from, next) => {
      if (authStore.isAuthorized) {
        next()
      } else {
        next({ name: 'login' })
      }
    },
    routes = [
      { path: '/', name: 'home', component: HomeView },
      {
        beforeEnter: ifNotAuthorized,
        path: '/login',
        name: 'login',
        component: () => import('@/views/LoginView.vue')
      },
      {
        beforeEnter: ifNotAuthorized,
        path: '/register',
        name: 'register',
        component: () => import('@/views/SignupView.vue')
      },
      {
        beforeEnter: ifAuthorized,
        path: '/settings',
        name: 'settings',
        component: () => import('@/views/SettingsView.vue')
      }
    ]

  if (l_router == null) {
    l_router = createRouter({ history: createWebHistory(), routes })
  }

  return l_router
}

export default router
