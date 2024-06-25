<template>
    <aside class="sidebar">
        <div class="sidebar-top">
            <router-link to="/"><button><v-icon icon="mdi-home" class="icon"></v-icon>Home</button></router-link>
            <router-link to="/settings"><button><v-icon icon="mdi-cog"
                        class="icon"></v-icon>Settings</button></router-link>
        </div>
        <div class="sidebar-bottom">
            <ProfileSidebarButton />
        </div>
    </aside>
</template>


<script>
import ProfileSidebarButton from '@/components/ProfileSidebarButton.vue'
export default {
    name: 'LeftSidebar',
    components: {
        ProfileSidebarButton
    }
}
</script>

<style scoped lang="scss">
@import '../css/sidebar.scss';
</style>
