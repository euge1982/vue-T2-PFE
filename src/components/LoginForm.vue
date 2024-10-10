<!-- Componente LoginForm -->

<!-- Script -->
<script setup lang="ts">

import { reactive } from 'vue';   //Libreria para trabajar con objetos reactivos
import { useStore } from '@/stores/store';   //Se importa el store
import { useRouter } from 'vue-router';   //Se importa el router
import type { User } from '@/models/UserModel.ts';   //Se importa el modelo User

//Se crea una variable del tipo User
const _user : User = reactive<User> ({
    user: '',
    password: '',
    remember: false
});

//Crea una copia reactiva del objeto _user
//const user = reactive({ ..._user });  

const store = useStore();   //Se define y usa el store
const router = useRouter();   //Se define y usa el router

//Funcion para manejar el envio del formulario
const handleSubmit = () => {
  //Se almacena el usuario en el store
  store.setUser( _user );
  //Redirigir a la vista Home
  router.push('/home');
};

</script>

<!-- Template -->
<template>
    <div class="wrapper">
        <!-- Se agrega el evento submit para manejar el envio del formulario  y prevent para que no recargue la pagina -->
        <form @submit.prevent="handleSubmit">   
            <!-- Titulo del formulario -->
            <h1>Login</h1>

            <!-- Input para el usuario -->
            <div class="input-bx">
                <!-- v-model se utiliza para manejar la informacion del input -->
                <input v-model="_user.user" type="text" placeholder="Usuario" required />
                <!-- icono de usuario -->
                <ion-icon class="icon" name="person-circle"></ion-icon>
            </div>

            <!-- Input para la contraseña -->
            <div class="input-bx">
                <input v-model="_user.password" type="password" placeholder="Contraseña" required />
                <!-- icono del candado -->
                <ion-icon class="icon" name="lock-closed"></ion-icon>
            </div>
       
            <div class="remember-forgot">
                <!-- Checkbox para recordar la contraseña -->
                <label>
                    <input type="checkbox" v-model="_user.remember" /> Recordarme
                </label>
                <!-- Enlace por si olvidaste la contraseña -->
                <a href="#">Olvidaste tu contraseña</a>
            </div>

            <!-- Boton para ingresar -->
            <button type="submit" class="btn">Ingresar</button>
        </form>
    </div>
</template>
  
<!-- Estilos, con el scoped se evita que el estilo se sobreescriba -->  
<style scoped>
.wrapper {
    width: 400px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(20px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    color: #fff;
    padding: 30px 40px;
    border-radius: 15px;
}
  
.wrapper h1 {
    font-size: 2.5em;
    text-align: center;
}
  
.wrapper .input-bx {
    position: relative;
    width: 100%;
    height: 60px;
    margin: 30px 0;
}
  
.wrapper .input-bx input {
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    border: 2px solid rgba(255, 255, 255, .2);
    border-radius: 15px;
    color: #fff;
    padding: 20px 45px 20px 20px;
    font-size: 1.1em;
}
  
.wrapper .input-bx input::placeholder {
    color: #fff;
    font-size: 1.2em;
}
  
.wrapper .input-bx .icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.5em;
}
  
.wrapper .remember-forgot {
    display: flex;
    justify-content: space-between;
    font-size: 1em;
    margin: -15px 0 15px;
}
  
.wrapper .remember-forgot label input {
    accent-color: #fff;
    margin-right: 3px;
}
  
.wrapper .remember-forgot a {
    color: #fff;
    text-decoration: none;
}
  
.wrapper .remember-forgot a:hover {
    text-decoration: underline;
}
  
.wrapper button {
    width: 100%;
    height: 50px;
    border-radius: 15px;
    border: none;
    outline: none;
    box-shadow: 0 0 10px rgba(0,0,0,.1);
    cursor: pointer;
    font-size: 1.2em;
    font-weight: 600;
    color: #333;
}
</style>  
