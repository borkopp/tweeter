import { defineStore } from 'pinia';
import { ref, inject } from 'vue';
import { useSessionStore } from './sessionStore';
import { getJson } from '@/service/rest/restJson';

export const useAccountStore = defineStore('account', () => {
  const sessionStore = useSessionStore();
  const user = ref(null);
  const error = ref(null);
  const config = inject('config');
  const restPaths = config.restPaths;

  const fetchUser = async () => {
    const session = sessionStore.session;
    console.log('Fetching user with session:', session);

    if (!session || !session.userId) {
      console.log('No user session or userId');
      return;
    }

    const userId = session.userId;
    try {
      const res = await getJson(`${restPaths.account}/${userId}`, { 
        p_session: session
      });
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

  const clearUser = () => {
    user.value = null;
    error.value = null;
  };

  return { user, error, fetchUser, clearUser };
});
