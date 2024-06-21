import fetchJson from './fetchJson';

/**
 * @function
 * @param   {string} p_url - REST URL to be fetched using the REST API method <code>GET</code>
 * @returns {JSON}   JSON data fetched from <code>p_url</code>: <code>{status, statusText, headers, data}</code>
 */
async function getJson(p_url, p_session = null) {
  return await fetchJson('GET', p_url, { p_session });
}

export default getJson;
