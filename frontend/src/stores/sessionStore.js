import { defineStore } from 'pinia';
import { reactive, computed, inject } from 'vue';
import {jwtDecode} from 'jwt-decode';

export const useSessionStore = defineStore('session', () => {
  const config = inject('config');
  const defaultSession = config.default.session;

  const session = reactive({});

  const setSession = (token) => {
    localStorage.setItem('authToken', token);
    updateSession(token);
  };

  const getSession = () => {
    const token = localStorage.getItem('authToken');
    return updateSession(token);
  };

  const clearSession = () => {
    localStorage.removeItem('authToken');
    resetSession();
  };

  const updateSession = (token) => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        Object.assign(session, {
          token,
          userId: decoded.id,
        });
      } catch (error) {
        console.error('Failed to decode token:', error);
        resetSession();
      }
    } else {
      resetSession();
    }
    return session;
  };

  const resetSession = () => {
    Object.keys(session).forEach(key => delete session[key]);
    Object.assign(session, defaultSession);
  };

  const isNotAuthorized = computed(() => !session.token);
  const isAuthorized = computed(() => !!session.token);

  getSession();

  return {
    session,
    setSession,
    getSession,
    clearSession,
    isNotAuthorized,
    isAuthorized,
  };
});
