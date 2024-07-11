import { defineStore } from 'pinia';
import { ref, inject } from 'vue';
import { useSessionStore } from './sessionStore';
import { getJson, patchJson } from '@/service/rest/restJson';

export const useAccountStore = defineStore('account', () => {
  const sessionStore = useSessionStore();
  const user = ref(null);
  const error = ref(null);
  const config = inject('config');
  const restPaths = config.restPaths;

  /**
   * Fetches the user data from the server based on the current session.
   *
   * This function is responsible for retrieving the user data from the server using the
   * current session information. If the session is valid and contains a user ID, the
   * function will make a GET request to the server to fetch the user data. The fetched
   * user data is then stored in the `user` reactive reference.
   *
   * If there is an error during the fetch process, the error message is stored in the
   * `error` reactive reference, and a console log message is displayed.
   */
  const fetchUser = async () => {
    const session = sessionStore.session;

    if (!session || !session.userId) {
      return;
    }

    const userId = session.userId;
    try {
      const res = await getJson(`${restPaths.account}/${userId}`, { 
        p_session: session
      });
      if (res.status === 200) {
        user.value = res.data;
      } else {
        error.value = res.data?.message || res.statusText;
        console.log('Failed to fetch user:', error.value);
      }
    } catch (err) {
      error.value = err.message || 'Failed to fetch user data';
      console.log('Error fetching user:', error.value);
    }
  };


  /**
   * Updates the user's username in the server and the local state.
   *
   * This function is responsible for sending a PATCH request to the server to update the
   * user's username. If the request is successful, the `username` property of the `user`
   * object is updated with the new value. If there is an error, the error message is
   * stored in the `error` reactive reference and logged to the console.
   *
   * @param {string} newUsername - The new username to be set for the user.
   * @throws {Error} If there is an error updating the username.
   */
  const changeUsername = async (newUsername) => {
    try {
      const res = await patchJson(`${restPaths.account}/change-username`, { newUsername }, {
        p_session: sessionStore.session
      });
      if (res.status === 200) {
        user.value.username = newUsername;
      } else {
        throw new Error(res.data?.message || res.statusText);
      }
    } catch (err) {
      error.value = err.message || 'Failed to update username';
      console.log('Error updating username:', error.value);
      throw err;
    }
  };

  /**
   * Updates the user's name in the server and the local state.
   *
   * This function is responsible for sending a PATCH request to the server to update the
   * user's name. If the request is successful, the `name` property of the `user`
   * object is updated with the new value. If there is an error, the error message is
   * stored in the `error` reactive reference and logged to the console.
   *
   * @param {string} newName - The new name to be set for the user.
   * @throws {Error} If there is an error updating the name.
   */
  const changeName = async (newName) => {
    try {
      const res = await patchJson(`${restPaths.account}/change-name`, { newName }, {
        p_session: sessionStore.session
      });
      if (res.status === 200) {
        user.value.name = newName;
      } else {
        throw new Error(res.data?.message || res.statusText);
      }
    } catch (err) {
      error.value = err.message || 'Failed to update name';
      console.log('Error updating name:', error.value);
      throw err;
    }
  };

  /**
   * Updates the user's password in the server.
   *
   * This function is responsible for sending a PATCH request to the server to update the
   * user's password. If the request is successful, a success message is logged to the console.
   * If there is an error, the error message is stored in the `error` reactive reference and
   * logged to the console.
   *
   * @param {string} currentPassword - The user's current password.
   * @param {string} newPassword - The new password to be set for the user.
   * @throws {Error} If there is an error updating the password.
   */
  const changePassword = async (currentPassword, newPassword) => {
    try {
      const res = await patchJson(`${restPaths.account}/change-password`, { currentPassword, newPassword }, {
        p_session: sessionStore.session
      });
      if (res.status === 200) {
        console.log('Password updated successfully');
      } else {
        throw new Error(res.data?.message || res.statusText);
      }
    } catch (err) {
      error.value = err.message || 'Failed to update password';
      console.log('Error updating password:', error.value);
      throw err;
    }
  };

  /**
   * Clears the user and error values in the account store.
   */
  const clearUser = () => {
    user.value = null;
    error.value = null;
  };

  return { user, error, fetchUser, clearUser, changeUsername, changeName, changePassword };
});
