<template>
    <aside class="sidebar">
        <div class="sidebar-top">
            <router-link to="/"><button>Home</button></router-link>
            <router-link to="/settings"><button>Settings</button></router-link>
        </div>
        <div class="sidebar-bottom">
            <router-link to="/login"><button>Login</button></router-link>
        </div>
    </aside>
</template>

<script>
export default {
    name: 'LeftSidebar',
};
</script>

<style scoped lang="scss">
@import '../css/sidebar.scss';
</style>