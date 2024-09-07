<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
const authStore = useAuthStore();

const { email, username, isAuthenticated } = storeToRefs(authStore);

const displayName = computed(() => username.value || email.value);
</script>

<template>
  <nav>
    <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
    <a v-if="isAuthenticated" @click="authStore.logout()">Logout</a>

    <span v-if="email">{{ displayName }}</span>
    <router-link v-if="isAuthenticated" to="/profile">Profile</router-link>
  </nav>
</template>

<style scoped></style>
