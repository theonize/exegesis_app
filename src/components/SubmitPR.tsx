import { useState } from 'react';
import { useGitHub } from '../GitHubContext';
import { submitDocumentPR } from '../githubApi';

export default function SubmitPR() {
  const { token } = useGitHub();
  const [path, setPath] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');

  async function handleSubmit() {
    if (!token) return;
    setStatus('Submitting PR...');
    try {
      await submitDocumentPR(path, content, token);
      setStatus('Pull request submitted');
    } catch (err) {
      console.error(err);
      setStatus('Failed to submit PR');
    }
  }

  return (
    <div>
      <h2>Submit New Document</h2>
      <input
        placeholder="path/to/file.md"
        value={path}
        onChange={(e) => setPath(e.target.value)}
      />
      <br />
      <textarea
        rows={10}
        cols={80}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit} disabled={!token}>Create Pull Request</button>
      {status && <p>{status}</p>}
    </div>
  );
}
