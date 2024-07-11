import fetchJson from './fetchJson';

/**
 * Sends a PATCH request to the specified URL with the provided data.
 *
 * @param {string} p_url - The URL to send the PATCH request to.
 * @param {object} p_data - The data to include in the PATCH request.
 * @param {object} [p_session=null] - An optional session object to include in the request.
 * @returns {Promise<any>} - The response from the PATCH request.
 */
async function patchJson(p_url, p_data, p_session = null) {
  return await fetchJson('PATCH', p_url, { p_data, p_session });
}

export default patchJson;
