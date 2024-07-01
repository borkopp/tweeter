<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import LogoSvg from '@/assets/logo.svg';
import router from '@/router';

export default {
    name: 'Signup',
    setup() {
        const authStore = useAuthStore();
        const name = ref('');
        const username = ref('');
        const email = ref('');
        const password = ref('');

        const handleRegister = async () => {
            console.log("Register button pressed");
            try {
                const registrationSuccessful = await authStore.register(name.value, username.value, email.value, password.value);
                if (registrationSuccessful) {
                    console.log('Registration and login successful');
                    router.push('/');
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
