// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { usePreferencesStore } from '@/stores/preferences'

axios.defaults.baseURL = 'http://localhost:3000'
axios.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

const app   = createApp(App)
const pinia = createPinia()

app.config.globalProperties.$axios = axios
app.use(pinia)
app.use(router)

/* Montaje protegido con try/finally */
;(async () => {
  const prefStore = usePreferencesStore(pinia)
  try {
    await prefStore.fetch()          // ya no revienta si falla
  } finally {
    prefStore.applyTheme()           // aplica tema por defecto o el recibido
    app.mount('#app')                // ¡la app SIEMPRE se monta!
  }
})()
