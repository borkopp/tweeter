import fetchJson from './fetchJson';


async function postJson(p_url, p_data, p_session = null) {
  return await fetchJson('POST', p_url, { p_data, p_session });
}

export default postJson;
