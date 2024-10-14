<!-- Vista de Login -->

<script setup lang="ts">
  //Se importa el componente LoginForm
  import LoginForm from '../components/LoginForm.vue';

</script>

<template>
    <div>
      <!-- Se envia el componente LoginForm con el objeto User 
      <LoginForm :user="User"/>  -->
      <LoginForm /> 
    </div>
  </template>  