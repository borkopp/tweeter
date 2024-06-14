<template>
    <div class="home-container">
        <LeftSidebar />
        <main class="main-content">
            <TweetBox />
        </main>
    </div>
</template>

<script>
import LeftSidebar from '../components/Sidebar.vue';
import TweetBox from '../components/TweetBox.vue'

export default {
    name: 'HomeView',
    components: {
        LeftSidebar,
        TweetBox,
    },
};
</script>

<style scoped lang="scss">
@import '../css/home.scss'
</style>
