<template>
    <router-link v-if="!authStore.isAuthorized" to="/login">
        <button class="login-button">
            <v-icon icon="mdi-login" class="icon"></v-icon>
            Login
        </button>
    </router-link>
    <div v-else class="profile-dropdown">
        <button @click="toggleDropdown" class="profile-button">
            <v-icon icon="mdi-account" class="profile-icon"></v-icon>
            <div class="profile-info">
                <div class="profile-name">{{ accountStore.user.name }}</div>
                <div class="profile-username">@{{ accountStore.user.username }}</div>
            </div>
            <v-icon icon="mdi-menu-down" class="dropdown-icon"></v-icon>
        </button>
        <div v-if="showDropdown" class="dropdown-menu">
            <router-link to="/profile">
                <div class="dropdown-item">
                    <v-icon icon="mdi-account" class="dropdown-item-icon"></v-icon>
                    My Profile
                </div>
            </router-link>
            <div class="dropdown-item" @click="handleLogout">
                <v-icon icon="mdi-logout" class="dropdown-item-icon"></v-icon>
                Logout
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/stores/auth'
import { useAccountStore } from '@/stores/StoreAccount'

export default {
    name: 'ProfileSidebar',
    setup() {
        const authStore = useAuthStore()
        const accountStore = useAccountStore()
        const router = useRouter()
        const toast = useToast()

        const user = accountStore.user
        const showDropdown = ref(false)

        const toggleDropdown = () => {
            showDropdown.value = !showDropdown.value
        }

        const handleLogout = () => {
            authStore.logout()
            router.push('/login')
            showDropdown.value = false
            toast.success('Logged out successfully!')
        }

        return {
            authStore,
            accountStore,
            showDropdown,
            toggleDropdown,
            handleLogout,
            user,
            toast
        }
    }
}
</script>

<style scoped lang="scss">
@import '../css/profile-dropdown.scss';
</style>