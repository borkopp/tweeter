import { defineStore } from 'pinia';
import { reactive, computed, inject } from 'vue';
import { useSessionStore } from './sessionStore';
import { getJson, postJson} from '@/service/rest/restJson';
import { useAccountStore } from './accountStore';

export const useAuthStore = defineStore('user', () => {
  const config = inject('config');
  const restPaths = config.restPaths;
  const sessionStore = useSessionStore();

  const user = reactive({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const resetUser = () => {
    Object.assign(user, config.default.account);
  };

  /**
   * Fetches the user data from the server and updates the local user object.
   *
   * @param {number} id - The ID of the user to fetch.
   * @returns {Promise<boolean>} - Returns true if the fetch was successful, false otherwise.
   */
  const getUser = async (id) => {
    const res = await getJson(`${restPaths.accounts}/${id}`, {
      headers: { Authorization: `Bearer ${sessionStore.session.token}` },
    });
    if (res.status === 200) {
      Object.assign(user, res.data);
    } else {
      resetUser();
    }
    return res.status < 300;
  };

  /**
   * Registers a new user with the provided name, username, email, and password.
   *
   * @param {string} name - The name of the user to register.
   * @param {string} username - The username of the user to register.
   * @param {string} email - The email of the user to register.
   * @param {string} password - The password of the user to register.
   * @returns {Promise<boolean>} - Returns true if the registration was successful, false otherwise.
   */
  const register = async (name, username, email, password) => {
    const res = await postJson(restPaths.register, { name, username, email, password });
    if (res.status === 201) {
      return await login(username, password);
    }
    return res.status < 300;
  };

  /**
   * Logs in a user with the provided username and password.
   *
   * @param {string} username - The username of the user to log in.
   * @param {string} password - The password of the user to log in.
   * @returns {Promise<boolean>} - Returns true if the login was successful, false otherwise.
   */
  const login = async (username, password) => {
    const res = await postJson(restPaths.login, { username: username.trim(), password: password.trim() });
    if (res.status === 200) {
      sessionStore.setSession(res.data.token);
      await getUser(sessionStore.session.userId);
      user.password = undefined; 

      const accountStore = useAccountStore();
      await accountStore.fetchUser();
      return true;
    } else {
      resetUser();
      sessionStore.clearSession();
      return false;
    }
  };

  /**
   * Logs out the current user by resetting the user data, clearing the session, and clearing the user data in the account store.
   */
  const logout = () => {
    resetUser();
    sessionStore.clearSession();
    const accountStore = useAccountStore();
    accountStore.clearUser();
  };

  /**
   * Computed property that returns true if the user is not authorized, based on the session store.
   * @returns {boolean} - True if the user is not authorized, false otherwise.
   */
  const isNotAuthorized = computed(() => sessionStore.isNotAuthorized);
  /**
   * Computed property that returns true if the user is authorized, based on the session store.
   * @returns {boolean} - True if the user is authorized, false otherwise.
   */
  const isAuthorized = computed(() => sessionStore.isAuthorized);

  resetUser();

  return {
    user,
    register,
    login,
    logout,
    getUser,
    isNotAuthorized,
    isAuthorized,
  };
});
