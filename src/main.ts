//Script principal

import './assets/global.css'   //Se importan los estilos para toda la aplicacion

import { createApp } from 'vue'   //Se importa la libreria de vue
import { createPinia } from 'pinia'   //Se importa la libreria de pinia

import App from './App.vue'   //Se importa el componente principal
import router from '@/router/index'   //Se importa el router

const app = createApp(App)   //Se crea la app
app.use(router)   //Se usa el router

app.use(createPinia())   //Se usa la libreria de pinia

app.mount('#app')   //Se renderiza la app