<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import LogoSvg from '@/assets/logo.svg';
import router from '@/router';
import { useToast } from 'vue-toastification';

export default {
    name: 'Signup',
    setup() {
        const authStore = useAuthStore();
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
                return;
            }
            try {
                const registrationSuccessful = await authStore.register(name.value, username.value, email.value, password.value);
                if (registrationSuccessful) {
                    router.push('/');
                    toast.success('Registration successful');
                } else {
                    console.log('Registration failed:', authStore.error);
                }
            } catch (error) {
                console.error('Error during registration:', error);
            }
        };

        return { authStore, name, username, email, password, handleRegister, LogoSvg };
    }
};

</script>

<template>
    <div class="signup">
        <div class="logo">
            <img :src="LogoSvg" alt="Logo" />
        </div>
        <h2>Sign Up</h2>
        <form @submit.prevent="handleRegister">
            <input type="email" v-model="email" placeholder="Email" required />
            <input type="text" v-model="username" placeholder="Username" required />
            <input type="text" v-model="name" placeholder="Name" required />
            <input type="password" v-model="password" placeholder="Password" required />
            <button type="submit"><v-icon icon="mdi-login" class="icon"></v-icon>Sign Up</button>
        </form>
        <p>Already have an account? <router-link to="/login">Login</router-link></p>
    </div>
</template>

<style scoped>
@import '../../css/signup.scss'
</style>
