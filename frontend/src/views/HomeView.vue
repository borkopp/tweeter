<template>
    <div class="home-container">
        <main class="main-content">
            <TweetBox />
            <TweetsList />
        </main>
    </div>
</template>

<script>
import TweetBox from '../components/TweetBox.vue'
import TweetsList from '../components/TweetsList.vue'

export default {
    name: 'HomeView',
    components: {
        TweetBox,
        TweetsList
    },
};
</script>

<style scoped lang="scss">
@import '../css/home.scss'
</style>
