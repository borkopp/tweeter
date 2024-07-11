<template>
    <div class="login">
        <div class="logo">
            <img :src="LogoSvg" alt="Logo" />
        </div>
        <h2>{{ t('login') }}</h2>
        <form @submit.prevent="handleLogin">
            <input v-model="username" :placeholder="t('username')" required />
            <input type="password" v-model="password" :placeholder="t('password')" required />
            <button type="submit"><v-icon icon="mdi-login" class="icon"></v-icon>{{ t('login') }}</button>
        </form>
        <p v-if="authStore.error" style="color: red;">{{ t(authStore.error) }}</p>
        <p>{{ t('no_account') }} <router-link to="/signup">{{ t('sign_up') }}</router-link></p>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import router from '@/router';
import LogoSvg from '@/assets/logo.svg';
import { useToast } from 'vue-toastification';
import { useI18nStore } from '@/stores/i18nStore';

export default {
    setup() {
        const authStore = useAuthStore();
        const i18n = useI18nStore();
        const username = ref('');
        const password = ref('');
        const toast = useToast();

        const handleLogin = async () => {
            await authStore.login(username.value, password.value);
            if (authStore.isAuthorized) {
                router.push('/');
                toast.success(i18n.t('login_success'));
            } else {
                toast.error(i18n.t('login_failed'));
            }
        };

        return { authStore, username, password, handleLogin, LogoSvg, t: i18n.t };
    },
};
</script>
<style scoped lang="scss">
@import '../../css/login.scss'
</style>