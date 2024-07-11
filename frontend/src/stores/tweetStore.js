import { defineStore } from 'pinia'
import { reactive, inject } from 'vue'
import { useSessionStore } from './sessionStore'
import { getJson, postJson, deleteJson} from '@/service/rest/restJson'

export const useTweetStore = defineStore('tweet', () => {
  const config = inject('config')
  const restPaths = config.restPaths
  const sessionStore = useSessionStore()

  const tweets = reactive([])

  /**
   * Fetches the latest tweets from the server and updates the local tweet store.
   *
   * This function sends a GET request to the `${restPaths.tweets}` endpoint with the
   * authorization token from the session store. If the request is successful (status 200),
   * the function updates the `tweets` array in the store with the fetched tweet data,
   * mapping the `likes_count` and `liked_by_user` properties to `likes` and `likedByUser`
   * respectively. If the request fails, an error message is logged to the console.
   */
  const fetchTweets = async () => {
    try {
      const res = await getJson(`${restPaths.tweets}`, {
        headers: { Authorization: `Bearer ${sessionStore.session.token}` },
      });
      if (res.status === 200) {
        tweets.splice(0, tweets.length, ...res.data.map(tweet => ({
          ...tweet,
          likes: tweet.likes_count,
          likedByUser: tweet.liked_by_user
        })));
      } else {
        console.error('Failed to fetch tweets:', res.statusText);
      }
    } catch (error) {
      console.error('Error fetching tweets:', error);
    }
  };

  /**
   * Posts a new tweet to the server.
   *
   * This function sends a POST request to the `${restPaths.tweets}` endpoint with the
   * authorization token from the session store and the provided `content` as the request
   * body. If the request is successful (status 201), the function adds the new tweet
   * to the beginning of the `tweets` array in the store. If the request fails, an error
   * message is logged to the console.
   *
   * @param {string} content - The content of the new tweet.
   */
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

  /**
   * Deletes a tweet from the server.
   *
   * This function sends a DELETE request to the `${restPaths.tweets}/${tweetId}` endpoint with the
   * authorization token from the session store. If the request is successful (status 200), the
   * function removes the deleted tweet from the `tweets` array in the store. If the request fails,
   * an error message is logged to the console.
   *
   * @param {string} tweetId - The ID of the tweet to be deleted.
   */
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


/**
 * Likes a tweet on the server.
 *
 * This function sends a POST request to the `${restPaths.tweets}/${tweetId}/like` endpoint with the
 * authorization token from the session store. If the request is successful (status 201), the
 * function increments the `likes` count of the tweet and sets the `likedByUser` flag to `true` in
 * the `tweets` array in the store. If the request fails, an error message is logged to the console.
 *
 * @param {string} tweetId - The ID of the tweet to be liked.
 */
const likeTweet = async (tweetId) => {
  try {
    const res = await postJson(`${restPaths.tweets}/${tweetId}/like`, {}, {
      headers: { Authorization: `Bearer ${sessionStore.session.token}` },
    });
    if (res.status === 201) {
      const tweet = tweets.find(t => t.id === tweetId);
      if (tweet) {
        tweet.likes++;
        tweet.likedByUser = true;
      }
    } else {
      console.error('Failed to like tweet:', res.statusText);
    }
  } catch (error) {
    console.error('Error liking tweet:', error);
  }
};

/**
 * Removes the user's like from a tweet on the server.
 *
 * This function sends a DELETE request to the `${restPaths.tweets}/${tweetId}/unlike` endpoint with the
 * authorization token from the session store. If the request is successful (status 200), the
 * function decrements the `likes` count of the tweet and sets the `likedByUser` flag to `false` in
 * the `tweets` array in the store. If the request fails, an error message is logged to the console.
 *
 * @param {string} tweetId - The ID of the tweet to be unliked.
 */
const unlikeTweet = async (tweetId) => {
  try {
    const res = await deleteJson(`${restPaths.tweets}/${tweetId}/unlike`, {
      headers: { Authorization: `Bearer ${sessionStore.session.token}` },
    });
    if (res.status === 200) {
      const tweet = tweets.find(t => t.id === tweetId);
      if (tweet) {
        tweet.likes--;
        tweet.likedByUser = false;
      }
    } else {
      console.error('Failed to unlike tweet:', res.statusText);
    }
  } catch (error) {
    console.error('Error unliking tweet:', error);
  }
};


  return {
    tweets,
    fetchTweets,
    postTweet,
    deleteTweet,
    likeTweet,
    unlikeTweet

  }
})
