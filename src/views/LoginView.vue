<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const email = ref<string>('');
const password = ref<string>('');
const error = ref<string>('');

const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/users/login', {
      email: email.value,
      password: password.value,
    });

    const token = response.data.token;

    authStore.setToken(token);

    await router.push('/');
  } catch (err: any) {
    if (err.response?.status === 401) {
      error.value = 'Invalid Credentials. Please try again';
    } else {
      error.value = 'An error occurred. Please try again later';
    }
  }
};

const goToSignup = () => router.push({ name: 'signup' });
</script>

<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
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
    <p v-if="error">{{ error }}</p>
    <button @click="goToSignup">Sign Up</button>
  </div>
</template>
