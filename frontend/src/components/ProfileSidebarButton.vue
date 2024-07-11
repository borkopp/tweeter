<template>
    <router-link v-if="!isAuthorized" to="/login">
        <button class="login-button">
            <v-icon icon="mdi-login" class="icon"></v-icon>
            {{ t('login') }}
        </button>
    </router-link>
    <div v-else class="profile-dropdown">
        <button @click="toggleDropdown" class="profile-button">
            <v-icon icon="mdi-account" class="profile-icon"></v-icon>
            <div v-if="accountStore.user" class="profile-info">
                <div class="profile-name">{{ user.name }}</div>
                <div class="profile-username">@{{ user.username }}</div>
            </div>
            <v-icon icon="mdi-menu-down" class="dropdown-icon"></v-icon>
        </button>
        <div v-if="showDropdown" class="dropdown-menu">
            <div class="dropdown-item" @click="handleLogout">
                <v-icon icon="mdi-logout" class="dropdown-item-icon"></v-icon>
                {{ t('logout') }}
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/stores/authStore'
import { useAccountStore } from '@/stores/accountStore'
import { useI18nStore } from "@/stores/i18nStore";

export default {
    name: 'ProfileSidebarButton',
    setup() {
        const authStore = useAuthStore()
        const accountStore = useAccountStore()
        const i18nStore = useI18nStore()
        const router = useRouter()
        const toast = useToast()
        const showDropdown = ref(false)

        const user = computed(() => accountStore.user)
        const isAuthorized = computed(() => authStore.isAuthorized)

        watch(() => authStore.isAuthorized, async (isAuthorized) => {
            if (isAuthorized && !accountStore.user) {
                await accountStore.fetchUser()
            }
        })


        onMounted(async () => {
            if (authStore.isAuthorized && !accountStore.user) {
                await accountStore.fetchUser()
            }
        })

        const toggleDropdown = () => {
            showDropdown.value = !showDropdown.value
        }

        const handleLogout = () => {
            authStore.logout();
            router.push('/login');
            showDropdown.value = false;
            toast.success(i18nStore.t('logout_success'));
        };

        return {
            authStore,
            accountStore,
            showDropdown,
            toggleDropdown,
            handleLogout,
            toast,
            user,
            isAuthorized,
            t: i18nStore.t
        }
    }
}
</script>

<style scoped lang="scss">
@import '../css/profile-dropdown.scss';
</style>