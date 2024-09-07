import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
import api from '@/api/axios';

interface ProfileState {
  bio: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const useProfileStore = defineStore('profile', () => {
  const userProfile = reactive<ProfileState>({
    bio: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    loading: false,
    loaded: false,
    error: null,
  });

  const profileLoading = computed(() => userProfile.loading);

  const submitProfile = async () => {
    userProfile.loading = true;

    const { loading, loaded, error, ...payload } = userProfile;

    try {
      await api
        .post(`http://localhost:3000/api/profile`, payload)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        .finally(() => (userProfile.loading = false));
    } catch (err: any) {
      userProfile.loading = false;
    }
  };

  return {
    userProfile,
    submitProfile,
    profileLoading,
  };
});
