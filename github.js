const GitHub = (() => {
  let token = null;
  let repo = null;
  const owner = 'cherrysimmonds';
  const FILE = 'data.json';

  function load() {
    token = localStorage.getItem('gh_token');
    repo = localStorage.getItem('gh_repo');
    return !!(token && repo);
  }

  function configure(t, r) {
    token = t;
    repo = r;
    localStorage.setItem('gh_token', t);
    localStorage.setItem('gh_repo', r);
  }

  function clear() {
    token = null; repo = null;
    localStorage.removeItem('gh_token');
    localStorage.removeItem('gh_repo');
  }

  async function request(method, path, body = null) {
    const res = await fetch(`https://api.github.com${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : null
    });
    if (res.status === 404) return null;
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `GitHub ${res.status}`);
    }
    return res.status === 204 ? null : res.json();
  }

  async function ensureRepo() {
    const exists = await request('GET', `/repos/${owner}/${repo}`);
    if (!exists) {
      await request('POST', '/user/repos', {
        name: repo,
        private: true,
        description: 'Budget App Data',
        auto_init: true
      });
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  async function loadData() {
    await ensureRepo();
    const file = await request('GET', `/repos/${owner}/${repo}/contents/${FILE}`);
    if (!file) return { data: null, sha: null };
    const content = JSON.parse(decodeURIComponent(escape(atob(file.content.replace(/\n/g, '')))));
    return { data: content, sha: file.sha };
  }

  async function saveData(data, sha) {
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))));
    const body = {
      message: `Budget sync ${new Date().toISOString().slice(0, 16).replace('T', ' ')}`,
      content
    };
    if (sha) body.sha = sha;
    const result = await request('PUT', `/repos/${owner}/${repo}/contents/${FILE}`, body);
    return result ? result.content.sha : sha;
  }

  function isConfigured() { return !!(token && repo); }
  function getRepo() { return repo; }

  return { load, configure, clear, loadData, saveData, isConfigured, getRepo };
})();
