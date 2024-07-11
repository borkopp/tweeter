import { defineStore } from 'pinia';
import { reactive, computed, inject } from 'vue';
import {jwtDecode} from 'jwt-decode';

export const useSessionStore = defineStore('session', () => {
  const config = inject('config');
  const defaultSession = config.default.session;

  const session = reactive({});

  /**
   * Sets the current session by storing the provided authentication token in localStorage and updating the session state.
   *
   * @param {string} token - The authentication token to be stored and used to update the session state.
   */
  const setSession = (token) => {
    localStorage.setItem('authToken', token);
    updateSession(token);
  };

  /**
   * Retrieves the current session from localStorage and updates the session state.
   *
   * @returns {Object} The updated session object.
   */
  const getSession = () => {
    const token = localStorage.getItem('authToken');
    return updateSession(token);
  };

  /**
   * Clears the current session by removing the authentication token from localStorage and resetting the session state.
   */
  const clearSession = () => {
    localStorage.removeItem('authToken');
    resetSession();
  };

  /**
   * Updates the current session state based on the provided authentication token.
   *
   * If a valid token is provided, it will be stored in the session object along with the decoded user ID.
   * If no token is provided or the token is invalid, the session will be reset to the default state.
   *
   * @param {string} token - The authentication token to be used to update the session state.
   * @returns {Object} The updated session object.
   */
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

  /**
   * Resets the current session state to the default state.
   * This function clears all the properties of the session object and
   * assigns the default session state.
   */
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
