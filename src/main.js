// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import axios from 'axios'

// Configuración global de axios
axios.defaults.baseURL = 'http://localhost:3000' // Cambia si tu backend tiene otra URL

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

const app = createApp(App)

// Para que axios esté disponible en componentes como this.$axios
app.config.globalProperties.$axios = axios

app.use(createPinia())
app.use(router)
app.mount('#app')
