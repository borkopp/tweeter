import { defineStore } from 'pinia';
import { ref, inject } from 'vue';
import { useAuthStore } from './auth';
import { getJson } from '@/service/rest/restJson';

export const useAccountStore = defineStore('account', () => {
  const authStore = useAuthStore();
  const user = ref(null);
  const error = ref(null);
  const config = inject('config');
  const restPaths = config.restPaths;

  const fetchUser = async () => {
    const session = authStore.getSession();
    console.log('Fetching user with session:', session);

    if (!session || !session.userId) {
      console.log('No user session or userId');
      return;
    }

    const userId = session.userId;
    try {
      const res = await getJson(`${restPaths.account}/${userId}`, session);
      if (res.status === 200) {
        user.value = res.data;
        console.log('User fetched successfully:', user.value);
      } else {
        error.value = res.data?.message || res.statusText;
        console.log('Failed to fetch user:', error.value);
      }
    } catch (err) {
      error.value = err.message || 'Failed to fetch user data';
      console.log('Error fetching user:', error.value);
    }
  };

  return { user, error, fetchUser };
});
