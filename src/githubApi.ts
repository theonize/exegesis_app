// Use the browser friendly build of Octokit to avoid pulling in node specific
// modules such as `node-fetch` when bundling for the web.
import { Octokit } from 'octokit/dist-web';

const OWNER = 'theonize';
const REPO = 'exegesis';

function createOctokit(token?: string | null) {
  return token ? new Octokit({ auth: token }) : new Octokit();
}

export async function searchRepoFiles(query: string, token?: string | null): Promise<string[]> {
  if (!query) return [];
  const octokit = createOctokit(token);
  const res = await octokit.rest.search.code({ q: `${query}+repo:${OWNER}/${REPO}` });
  return res.data.items.map((item) => item.path);
}

export async function fetchFileContent(path: string, token?: string | null): Promise<string> {
  const octokit = createOctokit(token);
  const res = await octokit.rest.repos.getContent({ owner: OWNER, repo: REPO, path });
  if (!('content' in res.data)) throw new Error('Invalid content response');
  const data = res.data as unknown as { content: string };
  const decoded = atob(data.content.replace(/\n/g, ''));
  // Use TextDecoder to properly decode UTF-8 content
  return new TextDecoder().decode(Uint8Array.from(decoded, (c) => c.charCodeAt(0)));
}

export async function submitDocumentPR(path: string, content: string, token: string): Promise<void> {
  const octokit = createOctokit(token);
  const { data: repo } = await octokit.rest.repos.get({ owner: OWNER, repo: REPO });
  const { data: head } = await octokit.rest.git.getRef({ owner: OWNER, repo: REPO, ref: `heads/${repo.default_branch}` });

  const branch = `exegesis-app-${Date.now()}`;
  await octokit.rest.git.createRef({ owner: OWNER, repo: REPO, ref: `refs/heads/${branch}`, sha: head.object.sha });

  await octokit.rest.repos.createOrUpdateFileContents({
    owner: OWNER,
    repo: REPO,
    path,
    message: `Add ${path}`,
    // Encode the content using btoa to avoid the Node `Buffer` API
    content: btoa(unescape(encodeURIComponent(content))),
    branch,
  });

  await octokit.rest.pulls.create({
    owner: OWNER,
    repo: REPO,
    title: `Add ${path}`,
    head: branch,
    base: repo.default_branch,
    body: 'Automated submission from Exegesis App',
  });
}
