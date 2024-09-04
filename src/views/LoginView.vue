<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const email = ref<string>('');
const password = ref<string>('');

const authStore = useAuthStore();
const router = useRouter();

const { loginError } = storeToRefs(authStore);

const goToSignup = () => router.push({ name: 'signup' });
</script>

<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="authStore.login(email, password)">
      <div>
        <label>Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="loginError">{{ loginError }}</p>
    <button @click="goToSignup">Sign Up</button>
  </div>
</template>
