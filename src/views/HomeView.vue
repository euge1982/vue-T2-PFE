<!-- Vista para mostrar los datos del usuario -->
<script setup lang="ts">
  import type { User } from '@/models/UserModel';   //Se importa el modelo User
  import { useStore } from '@/stores/userStore';   //Se importa el store
  import { useRouter } from 'vue-router';   //Se importa el router
  import { useAuthStore } from '@/stores/authStore';
  import { reactive } from 'vue';

  //Se define y usa el store. que trae los datos del usuario
  const store = useStore();
  
  //Se obtiene el usuario desde el store
  const user : User = reactive<User>(store.user);

  //Se define y usa el router
  const router = useRouter();

  const authStore = useAuthStore();

  //Funcion para cerrar la sesion
  function logout() {
    authStore.logout();
  }
</script>

<template>
  <!-- Datos del usuario -->
  <div>
    <h1>Hola: {{ user.userName }}</h1>

    <!-- Botón para cerrar sesión -->
    <button @click="logout()">
      Cerrar sesión
    </button>
  </div>
</template>

<style scoped>
  div {
    text-align: center;
    margin-top: 50px;
    color: #fff;
    font-size: 15px;    
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    letter-spacing: 2px;
    line-height: 1.5;
    padding: 0 20px;
    border: #fff 2px solid;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    height: auto;
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
  }

  h1 {
    font-size: 30px;
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 20px;
    font-size: 20px;
  }

  button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #fff;
    color: #2c2b2b;
    width: 100%;
    height: 50px;
    border: none;
    border-radius: 5px;
    font-size: 1.2em;
    font-weight: bold;
    cursor: pointer;
  }

  </style>