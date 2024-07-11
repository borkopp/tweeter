/**
 * Retrieves the authorization header for API requests.
 * 
 * If an authentication token is present in local storage, this function will return an object with the
 * `Authorization` header set to `Bearer <token>`. Otherwise, it will return an empty object.
 * 
 * This function is typically used to attach the necessary authentication information to outgoing
 * API requests.
 * 
 * @returns {Object} The authorization header object, or an empty object if no token is available.
 */
export function authHeader() {
    const token = localStorage.getItem('authToken');
    if (token) {
      return { Authorization: `Bearer ${token}` };
    } else {
      return {};
    }
  }