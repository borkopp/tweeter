import fetchJson from './fetchJson';

/**
 * @function
 * @param   {string} p_url - REST URL to be fetched using the REST API method <code>DELETE</code>
 * @param   {object} p_session - Optional session object containing token
 * @returns {JSON}   JSON data fetched from <code>p_url</code>: <code>{status, statusText, headers, data}</code>
 */
async function deleteJson(p_url, p_session = null) {
  return await fetchJson('DELETE', p_url, { p_session });
}

export default deleteJson;
