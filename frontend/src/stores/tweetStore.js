import { defineStore } from 'pinia'
import { reactive, inject } from 'vue'
import { useSessionStore } from './sessionStore'
import { getJson, postJson, deleteJson} from '@/service/rest/restJson'

export const useTweetStore = defineStore('tweet', () => {
  const config = inject('config')
  const restPaths = config.restPaths
  const sessionStore = useSessionStore()

  const tweets = reactive([])

  const fetchTweets = async () => {
    try {
      const res = await getJson(`${restPaths.tweets}`, {
        headers: { Authorization: `Bearer ${sessionStore.session.token}` },
      });
      if (res.status === 200) {
        tweets.splice(0, tweets.length, ...res.data);
      } else {
        console.error('Failed to fetch tweets:', res.statusText);
      }
    } catch (error) {
      console.error('Error fetching tweets:', error);
    }
  };

  const postTweet = async (content) => {
    try {
      const res = await postJson(
        `${restPaths.tweets}`,
        { content },
        {
          headers: { Authorization: `Bearer ${sessionStore.session.token}` }
        }
      )
      if (res.status === 201) {
        tweets.unshift(res.data)
      } else {
        console.error('Failed to post tweet:', res.statusText)
      }
    } catch (error) {
      console.error('Error posting tweet:', error)
    }
  }

  const deleteTweet = async (tweetId) => {
    try {
      const res = await deleteJson(`${restPaths.tweets}/${tweetId}`, {
        headers: { Authorization: `Bearer ${sessionStore.session.token}` },
      });
      if (res.status === 200) {
        const index = tweets.findIndex(tweet => tweet.id === tweetId);
        if (index !== -1) {
          tweets.splice(index, 1);
        }
      } else {
        console.error('Failed to delete tweet:', res.statusText);
      }
    } catch (error) {
      console.error('Error deleting tweet:', error);
    }
  };

  return {
    tweets,
    fetchTweets,
    postTweet,
    deleteTweet
  }
})
