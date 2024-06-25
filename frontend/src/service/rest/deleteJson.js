import fetchJson from './fetchJson';


async function deleteJson(p_url, p_session = null) {
  return await fetchJson('DELETE', p_url, { p_session });
}

export default deleteJson;
