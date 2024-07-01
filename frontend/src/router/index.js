import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from 'vue-toastification';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (!authStore.isAuthorized) {
        next();
      } else {
        next({ name: 'home' });

      }
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/SignupView.vue'),
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (!authStore.isAuthorized) {
        next();
      } else {
        next({ name: 'home' });
      }
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/SettingsView.vue'),
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      const toast = useToast();
      if (authStore.isAuthorized) {
        next();
      } else {
        next({ name: 'login' });
        toast.error('You are not logged in!');
      }
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;