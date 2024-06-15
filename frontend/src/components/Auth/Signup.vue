<script setup>
</script>
<template>
    <div class="signup">
        <h2>Sign Up</h2>
        <form @submit.prevent="signup">
            <input type="email" v-model="email" placeholder="Email" required />
            <input type="text" v-model="username" placeholder="Username" required />
            <input type="text" v-model="name" placeholder="Name" required />
            <input type="password" v-model="password" placeholder="Password" required />
            <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <router-link to="/login">Login</router-link></p>
    </div>
</template>



<style scoped>
@import '../../css/signup.scss'
</style>