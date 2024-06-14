<script setup>
</script>
<template>
    <div class="signup">
        <h2>Sign Up</h2>
        <form @submit.prevent="signup">
            <input type="email" v-model="email" placeholder="Email" required />
            <input type="password" v-model="password" placeholder="Password" required />
            <button type="submit">Sign Up</button>
        </form>
    </div>
</template>



<style scoped>
@import '../../css/signup.scss'
</style>