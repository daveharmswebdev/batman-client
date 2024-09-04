<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
const authStore = useAuthStore();

const { email, isAuthenticated } = storeToRefs(authStore);
</script>

<template>
  <nav>
    <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
    <a v-if="isAuthenticated" @click="authStore.logout()">Logout</a>

    <span v-if="email">{{ email }}</span>
  </nav>
</template>

<style scoped></style>
