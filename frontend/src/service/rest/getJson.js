import fetchJson from './fetchJson';


async function getJson(p_url, p_session = null) {
  return await fetchJson('GET', p_url, { p_session });
}

export default getJson;
