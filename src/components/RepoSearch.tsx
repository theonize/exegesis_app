import { useState } from 'react';
import { useGitHub } from '../GitHubContext';
import { searchRepoFiles } from '../githubApi';
import DocumentViewer from './DocumentViewer';

export default function RepoSearch() {
  const { token } = useGitHub();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  async function handleSearch() {
    if (!token) return;
    const files = await searchRepoFiles(query, token);
    setResults(files);
  }

  return (
    <div>
      <h2>Search Documents</h2>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch} disabled={!token}>Search</button>
      <ul>
        {results.map((path) => (
          <li key={path}>
            <button onClick={() => setSelected(path)}>{path}</button>
          </li>
        ))}
      </ul>
      {selected && <DocumentViewer path={selected} />}
    </div>
  );
}
