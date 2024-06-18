<script setup>
import LogoSvg from '@/assets/logo.svg';
</script>
<template>
    <div class="login">
        <div class="logo">
            <img :src="LogoSvg" alt="Logo" />
        </div>
        <h2>Login</h2>
        <form @submit.prevent="login">
            <input type="email" v-model="email" placeholder="Email" required />
            <input type="password" v-model="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <router-link to="/signup">Sign Up</router-link></p>
    </div>
</template>

<style scoped lang="scss">
@import '../../css/login.scss'
</style>