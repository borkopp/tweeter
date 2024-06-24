import './css/global.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const pinia = createPinia()

const config = {
  restPaths: {
    accounts: 'http://localhost:4000/api/auth/accounts',
    register: 'http://localhost:4000/api/auth/register',
    login: 'http://localhost:4000/api/auth/login'
  },
  default: {
    account: {
      id: null,
      name: '',
      username: '',
      email: ''
    }
  }
};


window.addEventListener('load', () => {
    createApp(App).provide('config', config).use(pinia).use(router()).mount('#app')
})