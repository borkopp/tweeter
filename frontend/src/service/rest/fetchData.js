const options = (p_method, p_data, p_headers, p_session = null) => {
  return {
    method: p_method,
    headers: {
      ...p_headers,
      ...(p_session?.token ? { 'Authorization': `Bearer ${p_session.token}` } : {})
    },
    ...(p_data ? { body: p_data } : {})
  };
};

/**
 * Fetches data from a URL with the specified HTTP method, headers, and session information.
 *
 * @param {string} p_method - The HTTP method to use for the fetch request (e.g. 'GET', 'POST', 'PUT', 'DELETE').
 * @param {string} p_url - The URL to fetch data from.
 * @param {object} options - An object containing additional options for the fetch request.
 * @param {object} [options.p_data] - The data to include in the request body.
 * @param {object} [options.p_headers={}] - Additional headers to include in the request.
 * @param {boolean} [options.p_fetch_json=false] - Whether to parse the response as JSON.
 * @param {object} [options.p_session=null] - An object containing session information, including a token for authentication.
 * @returns {Promise<object>} - An object containing the response status, headers, and data.
 */
const fetchData = async (p_method, p_url, { p_data, p_headers = {}, p_fetch_json = false, p_session = null }) => {
  try {
    const res = await fetch(p_url, options(p_method, p_data, p_headers, p_session));
    const headers = {};

    res.headers.forEach((value, name) => headers[name] = value);

    const result = {
      status: res.status,
      statusText: res.statusText,
      headers,
      token: headers.authorization ? headers.authorization.split(' ')[1] : null,
      data: null,
    };

    if (res.ok && !p_fetch_json) {
      result.data = await res.blob();
    } else if (res.ok && p_fetch_json) {
      result.data = await res.json();
    } else {
      // for non-json
      result.data = await res.text();
    }

    if (p_session?.saveSessionInfo != null) {
      p_session.saveSessionInfo(result);
    }

    if (!res.ok) {
      console.error('Fetch error:', result);
      throw new Error(result.statusText);
    }

    return result;
  } catch (error) {
    console.error('Fetch error:', error.message);
    return { status: 500, statusText: 'Fetch error', headers: {}, data: null };
  }
};


export default fetchData;
