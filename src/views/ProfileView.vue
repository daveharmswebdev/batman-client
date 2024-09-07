<script setup lang="ts">
import { useProfileStore } from '@/stores/profile';
import { storeToRefs } from 'pinia';

const profileStore = useProfileStore();

const { userProfile } = storeToRefs(profileStore);
</script>

<template>
  <div class="profile-container">
    <h2>Profile</h2>
    <form @submit.prevent="profileStore.submitProfile" class="profile-form">
      <div class="form-group">
        <label for="bio">Bio</label>
        <textarea id="bio" v-model="userProfile.bio"></textarea>
      </div>
      <div class="form-group">
        <label for="address1">Address 1</label>
        <input id="address1" v-model="userProfile.address1" />
      </div>
      <div class="form-group">
        <label for="address2">Address 2</label>
        <input id="address2" v-model="userProfile.address2" />
      </div>
      <div class="form-group">
        <label for="city">City</label>
        <input id="city" v-model="userProfile.city" />
      </div>
      <div class="form-group">
        <label for="state">State</label>
        <input id="state" v-model="userProfile.state" />
      </div>
      <div class="form-group">
        <label for="zip">Zip</label>
        <input id="zip" v-model="userProfile.zip" />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<style scoped>
/* General Container Styling */
.profile-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Heading */
h2 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

/* Form Styling */
.profile-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Form Group Styling */
.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

/* Input and Textarea Styling */
input,
textarea {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s ease-in-out;
}

input:focus,
textarea:focus {
  border-color: #007bff;
}

/* Button Styling */
button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

button:hover {
  background-color: #0056b3;
}
</style>
