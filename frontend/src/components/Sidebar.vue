<template>
    <aside class="sidebar">
        <div class="sidebar-top">
            <router-link to="/"><button><v-icon icon="mdi-home" class="icon"></v-icon>{{ t('home')
                    }}</button></router-link>
            <router-link to="/settings"><button>
                    <v-icon icon="mdi-cog" class="icon"></v-icon>{{ t('settings') }}
                </button></router-link>
        </div>
        <div class="sidebar-bottom">
            <ProfileSidebarButton />
        </div>
    </aside>
</template>

<script>
import ProfileSidebarButton from '@/components/ProfileSidebarButton.vue'
import { useI18nStore } from '@/stores/i18nStore';
export default {
    name: 'LeftSidebar',
    components: {
        ProfileSidebarButton
    },
    setup() {
        const i18nStore = useI18nStore();
        return { t: i18nStore.t }
    }
}
</script>

<style scoped lang="scss">
@import '../css/sidebar.scss';
</style>
