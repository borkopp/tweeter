<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useI18nStore } from '@/stores/i18nStore';
import LogoSvg from '@/assets/logo.svg';
import router from '@/router';
import { useToast } from 'vue-toastification';

export default {
    name: 'Signup',
    setup() {
        const authStore = useAuthStore();
        const i18nStore = useI18nStore();
        const name = ref('');
        const username = ref('');
        const email = ref('');
        const password = ref('');
        const toast = useToast();

        const isValidUsername = (username) => {
            const usernameRegex = /^[a-zA-Z0-9._-]+$/;
            return usernameRegex.test(username);
        };

        const handleRegister = async () => {
            if (!isValidUsername(username.value)) {
                toast.error(i18nStore.t('invalid_username'));
                return;
            }
            try {
                const registrationSuccessful = await authStore.register(name.value, username.value, email.value, password.value);
                if (registrationSuccessful) {
                    router.push('/');
                    toast.success(i18nStore.t('registration_successful'));
                } else {
                    console.log(i18nStore.t('registration_failed'), authStore.error);
                }
            } catch (error) {
                console.error(i18nStore.t('registration_error'), error);
            }
        };

        return { authStore, name, username, email, password, handleRegister, LogoSvg, t: i18nStore.t };
    }
};
</script>

<template>
    <div class="signup">
        <div class="logo">
            <img :src="LogoSvg" alt="Logo" />
        </div>
        <h2>{{ t('sign_up') }}</h2>
        <form @submit.prevent="handleRegister">
            <input type="email" v-model="email" :placeholder="t('email')" required />
            <input type="text" v-model="username" :placeholder="t('username')" required />
            <input type="text" v-model="name" :placeholder="t('name')" required />
            <input type="password" v-model="password" :placeholder="t('password')" required />
            <button type="submit"><v-icon icon="mdi-login" class="icon"></v-icon>{{ t('sign_up') }}</button>
        </form>
        <p>{{ t('have_account') }} <router-link to="/login">{{ t('login') }}</router-link></p>
    </div>
</template>

<style scoped>
@import '../../css/signup.scss'
</style>
