import { defineStore } from 'pinia';
import { reactive, computed, inject, ref } from 'vue';
import { getJson, postJson, patchJson, deleteJson } from '@/service/rest/restJson';
import { useSessionStore } from './StoreSession';
import { useAccountStore } from './StoreAccount';

export const useAuthStore = defineStore('auth', () => {
  const config = inject('config');
  const restPaths = config.restPaths;
  const sessionStore = useSessionStore();
  const accountStore = useAccountStore();

  const user = reactive({});
  const error = ref(null);

  const setSession = (session) => {
    console.log('Setting session:', session);
    sessionStore.setSession(session);
  };

  const getSession = () => {
    const session = sessionStore.getSession();
    console.log('Retrieved session:', session);
    return session;
  };

  const clearSession = () => {
    sessionStore.clearSession();
  };

  const reset = () => {
    console.log('Reset called');
    clearSession();
    Object.assign(user, config.default.account);
  };

  const getUser = async (id) => {
    console.log('getUser called with id:', id);
    const res = await getJson(`${restPaths.accounts}/${id}`, getSession());
    if (res.status === 200) {
      Object.assign(user, res.data);
    } else {
      Object.assign(user, config.account);
    }
    return res.status < 300;
  };

  const patchUser = async () => {
    console.log('patchUser called');
    const res = await patchJson(`${restPaths.accounts}/${user.id}`, user, getSession());
    return res.status < 300;
  };

  const deleteUser = async () => {
    console.log('deleteUser called');
    const res = await deleteJson(`${restPaths.accounts}/${user.id}`, getSession());
    return res.status < 300;
  };

  const register = async (name, username, email, password) => {
    console.log('register called with:', { name, username, email, password });
    const res = await postJson(restPaths.register, { name, username, email, password });
    if (res.status === 201) {
      console.log('Registration successful, attempting login with:', { username, password });
      return await login(username, password);
    } else {
      error.value = res.data?.message || res.statusText;
      console.log('Registration failed:', error.value);
      return false;
    }
  };

  const login = async (username, password) => {
    console.log('login called with:', { username, password });
    const res = await postJson(restPaths.login, { username: username.trim(), password: password.trim() });
    if (res.status === 200) {
      const session = {
        token: res.data.token,
        userId: res.data.userId
      };
      setSession(session);
      console.log('Login successful, session set:', session);
      await accountStore.fetchUser();
      user.password = undefined;
      return true;
    } else {
      error.value = res.data?.message || res.statusText;
      console.log('Login failed:', error.value);
      clearSession();
      return false;
    }
  };

  const logout = () => {
    clearSession();
  };

  const isNotAuthorized = computed(() => !getSession()?.token);
  const isAuthorized = computed(() => !!getSession()?.token);

  reset();

  return {
    user,
    session: getSession(),
    error,
    register,
    login,
    logout,
    isNotAuthorized,
    isAuthorized,
    getUser,
    patchUser,
    deleteUser,
    getSession
  };
});
