import './css/global.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Toast, { POSITION } from 'vue-toastification'
import "vue-toastification/dist/index.css";

import App from './App.vue'
import router from './router'

const pinia = createPinia()

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
})


const config = {
  apiRoot: '/json/i18n_$1.json',
  defaultLanguage: 'en',
  restPaths: {
    accounts: 'http://localhost:4000/api/auth/accounts',
    register: 'http://localhost:4000/api/auth/register',
    login: 'http://localhost:4000/api/auth/login',
    account: 'http://localhost:4000/api/account',
    tweets: 'http://localhost:4000/api/tweets'
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
    createApp(App).provide('config', config).use(pinia).use(router).use(vuetify).use(Toast, {position: POSITION.BOTTOM_RIGHT, timeout: 2000}).mount('#app')
})