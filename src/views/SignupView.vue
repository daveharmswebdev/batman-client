<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import axios from 'axios';

const name = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const error = ref<string>('');

const authStore = useAuthStore();
const router = useRouter();

const signUp = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/users', {
      name: name.value,
      password: password.value,
      email: email.value,
    });

    const token = response.data.token;

    authStore.setToken(token);

    await router.push('/');
  } catch (err: any) {
    error.value =
      err.response?.data?.message || 'Sign up failed. Please try again later.';
  }
};
</script>

<template>
  <div>
    <h2>Sign Up</h2>
    <form @submit.prevent="signUp">
      <div>
        <label>Name:</label>
        <input type="text" v-model="name" required />
      </div>
      <div>
        <label>Email:</label>
        <input type="text" v-model="email" required />
      </div>
      <div>
        <label>Password:</label>
        <input type="text" v-model="password" required />
      </div>
      <button type="submit">Sign up</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<style scoped></style>
