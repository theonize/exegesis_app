const OWNER = 'theonize';
const REPO = 'exegesis';
const API = 'https://api.github.com';

async function gh<T>(url: string, token: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `token ${token}`,
      ...options.headers,
    },
  });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

export async function searchRepoFiles(query: string, token: string): Promise<string[]> {
  if (!query) return [];
  const url = `${API}/search/code?q=${encodeURIComponent(query)}+repo:${OWNER}/${REPO}`;
  const data = await gh<{ items: { path: string }[] }>(url, token);
  return data.items.map((i) => i.path);
}

export async function fetchFileContent(path: string, token: string): Promise<string> {
  const url = `${API}/repos/${OWNER}/${REPO}/contents/${path}`;
  const data = await gh<{ content: string }>(url, token);
  return atob(data.content.replace(/\n/g, ''));
}

export async function submitDocumentPR(path: string, content: string, token: string): Promise<void> {
  // Simplified workflow using the contents API
  const branch = `exegesis-app-${Date.now()}`;
  const repo = await gh<{ default_branch: string }>(`${API}/repos/${OWNER}/${REPO}`, token);
  const head = await gh<{ object: { sha: string } }>(
    `${API}/repos/${OWNER}/${REPO}/git/refs/heads/${repo.default_branch}`,
    token
  );

  await gh(
    `${API}/repos/${OWNER}/${REPO}/git/refs`,
    token,
    {
      method: 'POST',
      body: JSON.stringify({
        ref: `refs/heads/${branch}`,
        sha: head.object.sha,
      }),
    }
  );

  await gh(
    `${API}/repos/${OWNER}/${REPO}/contents/${path}`,
    token,
    {
      method: 'PUT',
      body: JSON.stringify({
        message: `Add ${path}`,
        content: btoa(content),
        branch,
      }),
    }
  );

  await gh(
    `${API}/repos/${OWNER}/${REPO}/pulls`,
    token,
    {
      method: 'POST',
      body: JSON.stringify({
        title: `Add ${path}`,
        head: branch,
        base: repo.default_branch,
        body: 'Automated submission from Exegesis App',
      }),
    }
  );
}
