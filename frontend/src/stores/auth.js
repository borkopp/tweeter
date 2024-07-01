import { defineStore } from 'pinia';
import { reactive, computed, inject, ref } from 'vue';
import { getJson, postJson } from '@/service/rest/restJson';
import { useAccountStore } from './StoreAccount';
import {jwtDecode} from 'jwt-decode';

export const useAuthStore = defineStore('auth', () => {
  const config = inject('config');
  const restPaths = config.restPaths;
  const accountStore = useAccountStore();

  const user = reactive({});
  const error = ref(null);

  const setAuthToken = (token) => {
    localStorage.setItem('authToken', token);
  };

  const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };

  const clearAuthToken = () => {
    localStorage.removeItem('authToken');
  };

  const getSession = () => {
    const token = getAuthToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log('Retrieved token:', decoded);
        return { token, userId: decoded.id };
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
    return null;
  };

  const reset = () => {
    console.log('Reset called');
    clearAuthToken();
    Object.assign(user, config.default.account);
  };

  const getUser = async (id) => {
    console.log('getUser called with id:', id);
    const session = getSession();
    const res = await getJson(`${restPaths.accounts}/${id}`, { headers: { Authorization: `Bearer ${session.token}` } });
    if (res.status === 200) {
      Object.assign(user, res.data);
    } else {
      Object.assign(user, config.account);
    }
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
      setAuthToken(res.data.token);
      console.log('Login successful, token set:', res.data.token);
      await accountStore.fetchUser();
      user.password = undefined;
      return true;
    } else {
      error.value = res.data?.message || res.statusText;
      console.log('Login failed:', error.value);
      reset();
      return false;
    }
  };

  const logout = () => {
    clearAuthToken();
    accountStore.clearUser();
  };

  const isNotAuthorized = computed(() => !getSession()?.token);
  const isAuthorized = computed(() => !!getSession()?.token);

  const token = getAuthToken();
  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log('Retrieved token:', decoded);
      setAuthToken(token); 
      accountStore.fetchUser();
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  }

  reset();

  return {
    user,
    session: getSession,
    error,
    register,
    login,
    logout,
    isNotAuthorized,
    isAuthorized,
    getUser,
    getSession
  };
});
