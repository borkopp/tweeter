<template>
    <div class="home-container">
        <main class="main-content">
            <TweetBox />
        </main>
    </div>
</template>

<script>
import TweetBox from '../components/TweetBox.vue'

export default {
    name: 'HomeView',
    components: {
        TweetBox,
    },
};
</script>

<style scoped lang="scss">
@import '../css/home.scss'
</style>
