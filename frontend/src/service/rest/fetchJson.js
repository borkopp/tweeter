import fetchData from './fetchData';

const fetchJson = async (p_method, p_url, { p_data = null, p_session = null }) => 
  await fetchData(
    p_method,
    p_url,
    {
      p_data: p_data ? JSON.stringify(p_data) : null,
      p_headers: {
        'Accept': 'application/vnd.api+json, application/json',
        'Content-Type': 'application/json',
      },
      p_fetch_json: true,
      p_session,
    }
  );

export default fetchJson;
