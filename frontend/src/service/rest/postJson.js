import fetchJson from './fetchJson';


/**
 * Sends a POST request to the specified URL with the provided data.
 *
 * @param {string} p_url - The URL to send the POST request to.
 * @param {any} p_data - The data to be sent in the POST request.
 * @param {any} [p_session=null] - An optional session object to be included in the request.
 * @returns {Promise<any>} - The response from the server.
 */
async function postJson(p_url, p_data, p_session = null) {
  return await fetchJson('POST', p_url, { p_data, p_session });
}

export default postJson;
