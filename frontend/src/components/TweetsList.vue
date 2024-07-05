<template>
    <div class="tweets-list">
        <div v-for="tweet in tweets" :key="tweet.id" class="tweet">
            <div class="tweet-header">
                <span class="username">@{{ tweet.username }}</span>
                <span class="timestamp">{{ formatTimestamp(tweet.created_at) }}</span>
            </div>
            <div class="tweet-content">{{ tweet.content }}</div>
            <div class="tweet-actions">
                <button>Like</button>
                <button v-if="tweet.user_id === userId" @click="deleteTweet(tweet.id)">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { useTweetStore } from '@/stores/tweetStore';
import { useSessionStore } from '@/stores/sessionStore';

export default {
    name: 'TweetsList',
    setup() {
        const tweetStore = useTweetStore();
        const sessionStore = useSessionStore();

        const tweets = computed(() => tweetStore.tweets);
        const userId = computed(() => sessionStore.session.userId);

        const fetchTweets = async () => {
            await tweetStore.fetchTweets();
        };

        const deleteTweet = async (tweetId) => {
            await tweetStore.deleteTweet(tweetId);
        };
        const formatTimestamp = (timestamp) => {
            return new Date(timestamp).toLocaleString();
        };

        onMounted(fetchTweets);

        return {
            tweets,
            userId,
            formatTimestamp,
            deleteTweet,
        };
    },
};
</script>

<style scoped lang="scss">
@import '../css/tweetslist.scss';
</style>