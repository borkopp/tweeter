import fetchJson from './fetchJson';


/**
 * Deletes a JSON resource at the specified URL.
 *
 * @param {string} p_url - The URL of the JSON resource to delete.
 * @param {object} [p_session] - An optional session object to include in the request.
 * @returns {Promise<any>} - A Promise that resolves to the response data from the DELETE request.
 */
async function deleteJson(p_url, p_session = null) {
  return await fetchJson('DELETE', p_url, { p_session });
}

export default deleteJson;
