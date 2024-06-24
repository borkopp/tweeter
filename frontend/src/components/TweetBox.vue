<template>
    <div class="tweet-box">
        <textarea placeholder="Write something..."></textarea>
        <button class="tweet-button"><v-icon icon="mdi-twitter" class="icon"></v-icon>Tweet</button>
    </div>
</template>

<script>
export default {
    name: 'TweetBox'
}
</script>

<style scoped>
@import '../css/tweetbox.scss'
</style>