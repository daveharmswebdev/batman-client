import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();

  const token = ref<string | null>(localStorage.getItem('token'));
  const email = ref<string | null>(null);

  if (token.value) {
    try {
      const decoded = jwtDecode(token.value);
      email.value = decoded.email;
    } catch (e) {
      console.error('Error decoding token.', e);
    }
  }

  const setToken = (newToken: string | null) => {
    token.value = newToken;

    if (newToken) {
      localStorage.setItem('token', newToken);
      try {
        const decoded = jwtDecode(newToken);
        email.value = decoded.email;
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
    setToken,
    clearToken,
    logout,
    isAuthenticated,
  };
});
