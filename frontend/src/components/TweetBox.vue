<template>
    <div class="tweet-box">
        <textarea v-model="tweetContent" placeholder="Write something..."></textarea>
        <button @click="postTweet" class="tweet-button">
            <v-icon icon="mdi-twitter" class="icon"></v-icon>Tweet
        </button>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useTweetStore } from '@/stores/tweetStore'

export default {
    name: 'TweetBox',
    setup() {
        const tweetStore = useTweetStore()
        const tweetContent = ref('')
        const toast = useToast()

        const postTweet = async () => {
            if (!tweetContent.value.trim()) {
                toast.error('Tweet content cannot be empty!')
                return
            }

            try {
                await tweetStore.postTweet(tweetContent.value)
                toast.success('Tweet posted successfully!')
                tweetContent.value = ''
            } catch (error) {
                console.error('Error posting tweet:', error)
                toast.error('Failed to post tweet. Please try again.')
            }
        }

        return {
            tweetContent,
            postTweet
        }
    }
}
</script>

<style scoped>
@import '../css/tweetbox.scss';
</style>
