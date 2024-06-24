<template>
    <aside class="sidebar">
        <div class="sidebar-top">
            <router-link to="/"><button>Home</button></router-link>
            <router-link to="/settings"><button>Settings</button></router-link>
        </div>
        <div class="sidebar-bottom">
            <router-link v-if="!authStore.isAuthorized" to="/login"><button>Login</button></router-link>
            <button v-if="authStore.isAuthorized" @click="handleLogout">Logout</button>
        </div>
    </aside>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

export default {
    name: 'LeftSidebar',
    setup() {
        const authStore = useAuthStore()
        const router = useRouter()

        const handleLogout = () => {
            authStore.logout()
            router.push('/login')
        }

        return {
            authStore,
            handleLogout
        }
    }
};
</script>

<style scoped lang="scss">
@import '../css/sidebar.scss';
</style>
