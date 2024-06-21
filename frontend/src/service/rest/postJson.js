import fetchJson from './fetchJson';

/**
 * @function
 * @param   {string} p_url - REST URL to be fetched using the REST API method <code>POST</code>
 * @param   {object} p_data - Data to be sent in the body of the request
 * @param   {object} p_session - Optional session object containing token
 * @returns {JSON}   JSON data fetched from <code>p_url</code>: <code>{status, statusText, headers, data}</code>
 */
async function postJson(p_url, p_data, p_session = null) {
  return await fetchJson('POST', p_url, { p_data, p_session });
}

export default postJson;
