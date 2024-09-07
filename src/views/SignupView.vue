<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const firstName = ref<string>('');
const middleName = ref<string>('');
const lastName = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const error = ref<string>('');

const router = useRouter();

const signUp = async () => {
  try {
    await axios.post('http://localhost:3000/api/users', {
      firstName: firstName.value,
      middleName: middleName.value,
      lastName: lastName.value,
      password: password.value,
      email: email.value,
    });

    await router.push('/login');
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
        <label>First Name:</label>
        <input type="text" v-model="firstName" required />
      </div>
      <div>
        <label>Middle Name:</label>
        <input type="text" v-model="middleName" />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" v-model="lastName" required />
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
