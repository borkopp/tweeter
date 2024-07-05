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

  const register = async (name, username, email, password) => {
    const res = await postJson(restPaths.register, { name, username, email, password });
    if (res.status === 201) {
      return await login(username, password);
    }
    return res.status < 300;
  };

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

  const logout = () => {
    resetUser();
    sessionStore.clearSession();
    const accountStore = useAccountStore();
    accountStore.clearUser();
  };

  const isNotAuthorized = computed(() => sessionStore.isNotAuthorized);
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
