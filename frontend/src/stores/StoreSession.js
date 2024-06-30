import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSessionStore = defineStore('session', () => {
  const session = ref(JSON.parse(localStorage.getItem('session')) || null);

  const setSession = (newSession) => {
    session.value = newSession;
    localStorage.setItem('session', JSON.stringify(newSession));
  };

  const getSession = () => {
    const savedSession = JSON.parse(localStorage.getItem('session'));
    if (savedSession) {
      session.value = savedSession;
    }
    return session.value;
  };

  const clearSession = () => {
    session.value = null;
    localStorage.removeItem('session');
  };

  return {
    session,
    setSession,
    getSession,
    clearSession
  };
});
