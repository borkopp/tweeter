import fetchJson from './fetchJson';


/**
 * Fetches JSON data from the specified URL using the provided session, if any.
 *
 * @param {string} p_url - The URL to fetch the JSON data from.
 * @param {object} [p_session] - An optional session object to include in the request.
 * @returns {Promise<any>} - A Promise that resolves to the fetched JSON data.
 */
async function getJson(p_url, p_session = null) {
  return await fetchJson('GET', p_url, { p_session });
}

export default getJson;
