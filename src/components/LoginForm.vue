<!-- Componente LoginForm -->

<!-- Script -->
<script setup lang="ts">

//Importaciones locales
import { useRouter } from 'vue-router';   //Se importa el router
import { useAuthStore } from '@/stores/authStore';

//Importaciones de Librerias
import {Form, Field } from 'vee-validate';
import * as Yup from 'yup';

const router = useRouter();   //Se define y usa el router
const authStore = useAuthStore();   //Se define y usa el store de autenticacion

//Validacion con Yup
const schema = Yup.object().shape({
    userName: Yup.string().required('Usuario Requerido'),
    password: Yup.string().required('Contraseña Requerida')
});

//Si hay un usuario autenticado redirige a la home
if (authStore.auth.data) {
  router.push('/');
};

//Funcion para manejar el envio del formulario
function handleSubmit(values: any, {setErrors}: any) {
  const { userName, password } = values;
  //Si no hay errores realiza el login y redirige al home
  return authStore.login(userName, password).then(() => {
    router.push('/');
  })
  .catch(error => setErrors({apiError: error}))
};

</script>

<!-- Template -->
<template>
    <div class="wrapper">
        <!-- Se agrega el evento submit para manejar el envio del formulario -->
        <Form @submit="handleSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">   
            <!-- Titulo del formulario -->
            <h1>Login</h1>

            <!-- Field para el usuario -->
            <div class="input-bx">
                <Field name ="userName" type="text" :class="{'is-invalid': errors.userName || errors.apiError}" placeholder="Usuario" required />
                <!-- icono de usuario -->
                <ion-icon class="icon" name="person-circle"></ion-icon>
                <div class="invalid-feedback">{{ errors.userName }}</div>
            </div>

            <!-- Field para la contraseña -->
            <div class="input-bx">
                <Field name ="password" type="password" :class="{'is-invalid': errors.password || errors.apiError}" placeholder="Contraseña" required />
                <!-- icono del candado -->
                <ion-icon class="icon" name="lock-closed"></ion-icon>
                <div class="invalid-feedback">{{ errors.password }}</div>
            </div>
       
            <div class="remember-forgot">
                <!-- Checkbox para recordar la contraseña -->
                <label>
                    <input type="checkbox" name="remember" /> Recordarme
                </label>
                <!-- Enlace por si olvidaste la contraseña -->
                <a href="#">Olvidaste tu contraseña</a>
            </div>

            <!-- Boton para ingresar -->
            <button type="submit" class="btn">
                <span v-show="isSubmitting" class="loader"></span> 
                <p v-show="!isSubmitting">Ingresar</p>
            </button>
            <!-- Mensaje de error -->
            <div v-if="errors.apiError" class="error-alert">{{ errors.apiError }}</div>
        </Form>
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
  
.wrapper .input-bx input.is-invalid {
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    border: 2px solid rgba(255, 255, 255, .2);
    color: red;
}

.wrapper .input-bx input::placeholder {
    color: #fff;
    font-size: 1.2em;
}
  
.wrapper .input-bx input.is-invalid::placeholder {
    color: red;
    font-size: 1.2em;
}

.wrapper .input-bx .icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.5em;
}
  
.wrapper .input-bx .invalid-feedback {
    padding: 0% 6px;
    margin: 0;
    color: red;
    font-weight: 300;
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

.wrapper .button p{
    font-size: 1.2em;
    font-weight: 600;
    color: #333;
}

.loader {
    margin:auto 0;
    width: 24px;
    height: 24px;
    border: 4px solid purple;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.error-alert{
    margin: 16px 0 0 0;
    width: 100%;
    background: transparent;
    color: red;
    text-align: center;
    font-weight: 400; 
}

</style>  