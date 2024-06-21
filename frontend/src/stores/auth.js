import { defineStore } from 'pinia';
import { reactive, computed, inject, ref } from 'vue';
import { getJson, postJson, patchJson, deleteJson } from '@/service/rest/restJson';

export const useAuthStore = defineStore('auth', () => {
  const config = inject('config');
  const restPaths = config.restPaths;

  const user = reactive({});
  const session = reactive({ token: null });
  const error = ref(null);

  const reset = () => {
    console.log('Reset called');
    session.token = null;
    Object.assign(user, config.default.account);
  };

  const getUser = async (id) => {
    console.log('getUser called with id:', id);
    const res = await getJson(`${restPaths.accounts}/${id}`, session);
    if (res.status === 200) {
      Object.assign(user, res.data);
    } else {
      Object.assign(user, config.account);
    }
    return res.status < 300;
  };

  const patchUser = async () => {
    console.log('patchUser called');
    const res = await patchJson(`${restPaths.accounts}/${user.id}`, user, session);
    return res.status < 300;
  };

  const deleteUser = async () => {
    console.log('deleteUser called');
    const res = await deleteJson(`${restPaths.accounts}/${user.id}`, session);
    return res.status < 300;
  };

  const register = async (name, username, email, password) => {
    console.log('register called with:', { name, username, email, password });
    user.name = name;
    user.username = username;
    user.email = email;
    user.password = password;
    const res = await postJson(restPaths.register, user);
    if (res.status === 201) {
      console.log('Registration successful, attempting login with:', { username, password });
      const loginRes = await login(username, password);
      return loginRes;
    } else {
      error.value = res.data?.message || res.statusText;
      console.log('Registration failed:', error.value);
    }
    return res.status < 300;
  };

  const login = async (username, password) => {
    console.log('login called with:', { username, password });
    const res = await postJson(restPaths.login, {
      username: username.trim(),
      password: password.trim()
    }, session);
    if (res.status === 200) {
      session.token = res.token;
      await getUser(res.userId);
      user.password = undefined; 
    } else {
      error.value = res.data?.message || res.statusText;
      console.log('Login failed:', error.value);
      reset(); 
    }
    return res.status < 300;
  };

  const logout = reset;

  const isNotAuthorized = computed(() => !session.token);
  const isAuthorized = computed(() => !!session.token);

  reset();

  return {
    user,
    register,
    login,
    logout,
    reset,
    getUser,
    patchUser,
    deleteUser,
    isNotAuthorized,
    isAuthorized,
    error,
  };
});
