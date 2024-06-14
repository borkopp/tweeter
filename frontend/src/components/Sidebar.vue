<template>
    <aside class="sidebar">
        <div class="sidebar-top">
            <button>Home</button>
            <button>Settings</button>
        </div>
        <div class="sidebar-bottom">
            <button><router-link to="/login">Login</router-link></button>
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