<template>
    <div class="login">
        <div class="logo">
            <img :src="LogoSvg" alt="Logo" />
        </div>
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
            <input v-model="username" placeholder="Username" required />
            <input type="password" v-model="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
        <p v-if="authStore.error" style="color: red;">{{ authStore.error }}</p>
        <p>Don't have an account? <router-link to="/signup">Sign Up</router-link></p>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

export default {
    setup() {
        const authStore = useAuthStore();
        const username = ref('');
        const password = ref('');

        const handleLogin = async () => {
            console.log("Login button pressed");
            await authStore.login(username.value, password.value);
            if (authStore.isAuthorized) {
                console.log('Login successful');
                // Redirect to home or another page
            }
        };

        return { authStore, username, password, handleLogin };
    },
};
</script>

<style scoped lang="scss">
@import '../../css/login.scss'
</style>