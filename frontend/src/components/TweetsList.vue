<template>
    <div class="tweets-list">
        <div v-for="tweet in tweets" :key="tweet.id" class="tweet">
            <div class="tweet-header">
                <span class="username">@{{ tweet.username }}</span>
                <span class="timestamp">{{ formatTimestamp(tweet.created_at) }}</span>
            </div>
            <div class="tweet-content">{{ tweet.content }}</div>
            <div class="tweet-actions">
                <button @click="toggleLike(tweet)">
                    <v-icon :icon="tweet.likedByUser ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'" class="icon"></v-icon>
                    {{ tweet.likes || 0 }}
                </button>
                <button v-if="tweet.user_id === userId" @click="deleteTweet(tweet.id)">
                    <v-icon icon="mdi-delete" class="icon"></v-icon>
                    {{ t('delete') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { useTweetStore } from '@/stores/tweetStore';
import { useSessionStore } from '@/stores/sessionStore';
import { useI18nStore } from '@/stores/i18nStore';
import { useToast } from 'vue-toastification';

export default {
    name: 'TweetsList',
    setup() {
        const tweetStore = useTweetStore();
        const sessionStore = useSessionStore();
        const i18nStore = useI18nStore();
        const toast = useToast();

        const tweets = computed(() => tweetStore.tweets);
        const userId = computed(() => sessionStore.session.userId);

        const fetchTweets = async () => {
            await tweetStore.fetchTweets();
        };

        const deleteTweet = async (tweetId) => {
            await tweetStore.deleteTweet(tweetId);
            toast.success(i18nStore.t('tweet_deleted'));
        };

        const formatTimestamp = (timestamp) => {
            return new Date(timestamp).toLocaleString();
        };

        const toggleLike = async (tweet) => {
            if (tweet.likedByUser) {
                await tweetStore.unlikeTweet(tweet.id);
            } else {
                await tweetStore.likeTweet(tweet.id);
            }
        };

        onMounted(fetchTweets);

        return {
            tweets,
            userId,
            formatTimestamp,
            deleteTweet,
            toggleLike,
            t: i18nStore.t
        };
    },
};
</script>

<style scoped lang="scss">
@import '../css/tweetslist.scss';
</style>