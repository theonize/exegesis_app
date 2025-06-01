// useRepoDocs.ts
export async function fetchDocsList(token) {
  const octokit = new Octokit({ auth: token });
  const res = await octokit.repos.getContent({
    owner: process.env.VITE_GITHUB_OWNER,
    repo: process.env.VITE_GITHUB_REPO,
    path: "docs",
  });
  return res.data.filter(file => file.name.endsWith(".md"));
}

export async function fetchDocContent(token, path) {
  const octokit = new Octokit({ auth: token });
  const res = await octokit.repos.getContent({
    owner: process.env.VITE_GITHUB_OWNER,
    repo: process.env.VITE_GITHUB_REPO,
    path,
  });
  const content = atob(res.data.content);
  return content;
}


export async function createDocument(token, path, content) {
  const octokit = new Octokit({ auth: token });
  await octokit.pulls.create({
    owner: process.env.VITE_GITHUB_OWNER,
    repo: process.env.VITE_GITHUB_REPO,
    title: "Create new document",
    body: content,
    head: "main",
    base: "main",
  });
}


export async function updateDocument(token, path, content) {
  const octokit = new Octokit({ auth: token });
  await octokit.pulls.create({
    owner: process.env.VITE_GITHUB_OWNER,
    repo: process.env.VITE_GITHUB_REPO,
    title: "Update document",
    body: content,
    head: "main",
    base: "main",
  });
}


export async function createIssue(token, title, body) {
  const octokit = new Octokit({ auth: token });
  await octokit.issues.create({
    owner: process.env.VITE_GITHUB_OWNER,
    repo: process.env.VITE_GITHUB_REPO,
    title,
    body,
  });
}


export async function updateIssue(token, issueNumber, title, body) {
  const octokit = new Octokit({ auth: token });
  await octokit.issues.update({
    owner: process.env.VITE_GITHUB_OWNER,
    repo: process.env.VITE_GITHUB_REPO,
    issue_number: issueNumber,
    title,
    body,
  });
}
