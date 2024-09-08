import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();

  const token = ref<string | null>(localStorage.getItem('token'));
  const email = ref<string | null>(null);
  const username = ref<string | null>(null);
  const loginError = ref<string>('');
  const role = ref<string | null>(null);

  if (token.value) {
    try {
      const decoded = jwtDecode(token.value);
      email.value = decoded.email;
      role.value = decoded.role;
    } catch (e) {
      console.error('Error decoding token.', e);
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/users/login',
        {
          email: email,
          password: password,
        }
      );

      const token = response.data.token;

      setToken(token);

      router.push('/');
    } catch (err: any) {
      if (err.response?.status === 401) {
        loginError.value = 'Invalid Credentials. Please try again';
      } else {
        loginError.value = 'An error occurred. Please try again later';
      }
    }
  };

  const setToken = (newToken: string | null) => {
    token.value = newToken;

    if (newToken) {
      localStorage.setItem('token', newToken);
      try {
        const decoded = jwtDecode(newToken);
        email.value = decoded.email;
        username.value = decoded.username;
        role.value = decoded.role;
      } catch (e) {
        console.error(e);
      }
    } else {
      clearToken();
    }
  };

  const clearToken = () => {
    token.value = null;
    email.value = null;
    role.value = null;
    localStorage.removeItem('token');
  };

  const logout = () => {
    clearToken();
    router.push('/login');
  };

  const isAuthenticated = computed(() => !!token.value);

  return {
    token,
    email,
    username,
    role,
    setToken,
    clearToken,
    login,
    logout,
    loginError,
    isAuthenticated,
  };
});
