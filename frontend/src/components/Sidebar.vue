<template>
    <aside class="sidebar">
        <div class="sidebar-top">
            <router-link to="/"><button><v-icon icon="mdi-home" class="icon"></v-icon>Home</button></router-link>
            <router-link to="/settings"><button><v-icon icon="mdi-cog"
                        class="icon"></v-icon>Settings</button></router-link>
        </div>
        <div class="sidebar-bottom">
            <router-link v-if="!authStore.isAuthorized" to="/login">
                <button>
                    <v-icon icon="mdi-login" class="icon"></v-icon>
                    Login
                </button>
            </router-link>
            <button v-if="authStore.isAuthorized" @click="handleLogout">
                <v-icon icon="mdi-logout" class="icon"></v-icon>Logout
            </button>
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
}
</script>

<style scoped lang="scss">
@import '../css/sidebar.scss';
</style>
