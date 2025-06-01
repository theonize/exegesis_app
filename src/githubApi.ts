import { Octokit } from 'octokit';

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
  return Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf8');
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
    content: Buffer.from(content, 'utf8').toString('base64'),
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
