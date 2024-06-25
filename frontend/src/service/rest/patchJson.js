import fetchJson from './fetchJson';

async function patchJson(p_url, p_data, p_session = null) {
  return await fetchJson('PATCH', p_url, { p_data, p_session });
}

export default patchJson;
