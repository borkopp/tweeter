<template>
    <div class="tweet-box">
        <textarea v-model="tweetContent" :placeholder="t('write_something')"></textarea>
        <button @click="postTweet" class="tweet-button">
            <v-icon icon="mdi-twitter" class="icon"></v-icon>{{ t('tweet') }}
        </button>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useTweetStore } from '@/stores/tweetStore'
import { useI18nStore } from '@/stores/i18nStore'

export default {
    name: 'TweetBox',
    setup() {
        const tweetStore = useTweetStore()
        const i18nStore = useI18nStore()
        const tweetContent = ref('')
        const toast = useToast()
        const { t } = i18nStore

        const postTweet = async () => {
            if (!tweetContent.value.trim()) {
                toast.error(t('tweet_empty'))
                return
            }

            try {
                await tweetStore.postTweet(tweetContent.value)
                toast.success(t('tweet_posted'))
                tweetContent.value = ''
            } catch (error) {
                console.error(t('tweet_error'), error)
                toast.error(t('tweet_failed'))
            }
        }

        return {
            tweetContent,
            postTweet,
            t
        }
    }
}
</script>

<style scoped>
@import '../css/tweetbox.scss';
</style>
