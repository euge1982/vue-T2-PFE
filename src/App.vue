<!-- App -->

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- Componente App -->
    <nav>
      <RouterLink to="/"></RouterLink>
    </nav>
  <RouterView />
</template>