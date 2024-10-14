//Script principal

import './assets/global.css'   //Se importan los estilos para toda la aplicacion

import { createApp } from 'vue'   //Se importa la libreria de vue
import { createPinia } from 'pinia'   //Se importa la libreria de pinia
import { useAuthStore } from './stores/authStore'
import { fakeBackend } from './helpers/fakebackend'

import App from './App.vue'   //Se importa el componente principal
import router from '@/router/index'   //Se importa el router

fakeBackend();
startApp();

async function startApp() {
    const app = createApp(App)   //Se crea la app
    
    app.use(router)   //Se usa el router
    app.use(createPinia())   //Se usa la libreria de pinia

    try {
        const authStore = useAuthStore()   //Se usa el store de autenticacion
        await authStore.refreshToken()   //Se usa el fake backend
    } 
    catch (error) {
        console.warn('No hay datos de autenticacion para el usuario');
        console.info('Redirigiendo a login page');
        router.push('/login')
    }

    app.mount('#app')   //Se renderiza la app
}