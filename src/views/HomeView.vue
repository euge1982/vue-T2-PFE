<!-- Vista para mostrar los datos del usuario -->
<script setup lang="ts">
  import { useStore } from '@/stores/userStore';   //Se importa el store
  //import { useRouter } from 'vue-router';   //Se importa el router
  import { useAuthStore } from '@/stores/authStore';
  import { useSesionStore } from '@/stores/sesionStore';

  const store = useStore();
  const sesionStore = useSesionStore();
  const authStore = useAuthStore();
  //const router = useRouter();  //Se define y usa el router

  store.loadUsersFromLocalStorage();   //Carga los usuarios desde el localStorage
  sesionStore.refreshSesion();   //Actualiza el sesionStore

  //Funcion para cerrar la sesion
  function logout() {
    authStore.logout();
  }

</script>

<template>
  <!-- Datos del usuario -->
  <div>
    <div class="presentation">
      <h1>Hola, {{ authStore.auth.data?.firstName }}</h1>
    </div>
       
    <div class="info-user">
      <p><strong>Nombre: </strong>{{ authStore.auth.data?.firstName }} {{ authStore.auth.data?.lastName }}</p>
      <p><strong>Rol: </strong>{{  authStore.auth.data?.isAdmin ? 'Administrador' : 'Usuario' }}</p>
    </div>

    <div v-if="sesionStore.data">
      <h2>Informacion de Sesion:</h2>
      <p>JWT Payload: {{ sesionStore.data.tokenPayload }}</p>
      <p>JWT Creado a las: {{ sesionStore.data.creationDate.toLocaleString() }}</p>
      <p>JWT Expira a las: {{ sesionStore.data.expirationDate.toLocaleString() }}</p>
      <p>JWT Refresh a las: {{ sesionStore.data.refreshDate.toLocaleString() }}</p>
    </div>   

    <div class="userList">
      <h2>Usuarios</h2>
      <ul>
        <li v-for="user in store.users" :key="user.id">
          {{ user.userName }}: {{ user.firstName }} {{ user.lastName }} 
          {{ user.isAdmin === true ? "[Administrador]" : "[Usuario]" }}
        </li>
      </ul>
    </div>

    <!-- Boton para agregar usuario, no tiene funcionalidad -->
    <button v-if="authStore.auth.data?.isAdmin" class="btn">
      Agregar usuario
    </button>

    <!-- Boton para cerrar sesion -->
    <button @click="logout()">
      Cerrar sesión
    </button>
  </div>
</template>

<style scoped>
  div{
    text-align: center;
    color: #fff;
    font-size: 15px;    
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    letter-spacing: 1px;
    line-height: 1.5;
    border: #fff 1px solid;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    height: auto;
    max-width: 500px;
    margin: 0 auto;
    padding: 10px;
  }

  h1 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 10px;
    font-size: 15px;
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

  .btn {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #2c2b2b;
    color:#fff ;
    width: 50%;
    height: 50px;
    border:1px solid #fff;
    border-radius: 30px;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    margin-left: 0;
    display: block;
  }

  .btn:hover {
    background-color: #fff;
    color: #2c2b2b;
  }

  h2 {
    font-size: 20px;
  }

  </style>