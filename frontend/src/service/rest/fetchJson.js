import fetchData from './fetchData';
import { authHeader } from '@/utils/authHeader';

/**
 * Fetches JSON data from the specified URL using the provided method and options.
 *
 * @param {string} p_method - The HTTP method to use for the request (e.g. 'GET', 'POST', 'PUT', 'DELETE').
 * @param {string} p_url - The URL to fetch the data from.
 * @param {object} [p_data=null] - The data to send with the request, if any.
 * @param {object} [p_session=null] - The session object to use for the request, if any.
 * @returns {Promise<any>} - A Promise that resolves to the fetched JSON data.
 */
const fetchJson = async (p_method, p_url, { p_data = null, p_session = null }) => 
  await fetchData(
    p_method,
    p_url,
    {
      p_data: p_data ? JSON.stringify(p_data) : null,
      p_headers: {
        'Accept': 'application/vnd.api+json, application/json',
        'Content-Type': 'application/json',
        ...authHeader(),
      },
      p_fetch_json: true,
      p_session,
    }
  );

export default fetchJson;
