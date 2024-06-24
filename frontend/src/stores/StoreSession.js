import { defineStore } from 'pinia';

export const useSessionStore = defineStore('session', {
  state: () => ({
    session: JSON.parse(localStorage.getItem('session')) || null,
  }),

  actions: {
    setSession(session) {
      this.session = session;
      localStorage.setItem('session', JSON.stringify(session));
    },

    getSession() {
      const session = JSON.parse(localStorage.getItem('session'));
      if (session) {
        this.session = session;
      }
      return this.session;
    },

    clearSession() {
      this.session = null;
      localStorage.removeItem('session');
    },
  },
});
