//Archivo de configuracion del router

import { createRouter, createWebHistory } from 'vue-router';   //Libreria para trabajar con rutas
import LoginPage from '@/views/LoginPage.vue';   //Se importa el componente LoginPage
import HomeView from '@/views/HomeView.vue';   //Se importa el componente HomeView

//Se crean las rutas
const routes = [
  { 
    path: '/', 
    name: 'home',
    component: HomeView 
  },
  { 
    path: '/login',
    name: 'login', 
    component: LoginPage }
];

//Se crea el router
const router = createRouter({
  history: createWebHistory(),   //Se crea el router
  routes,   //Se agrega las rutas
});

export default router;   //Se exporta el router