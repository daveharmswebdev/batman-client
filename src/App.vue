<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <nav>
    <router-link to="/login">Login</router-link>
  </nav>

  <RouterView />
</template>
