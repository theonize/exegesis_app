import { useEffect, useState } from 'react';
import { useGitHub } from '../GitHubContext';
import { fetchFileContent, submitDocumentPR } from '../githubApi';

export default function DocumentViewer({ path }: { path: string }) {
  const { token } = useGitHub();
  const [content, setContent] = useState('');
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    async function load() {
      const c = await fetchFileContent(path, token);
      setContent(c);
      setEditText(c);
    }
    load();
  }, [path, token]);

  async function submitEdit() {
    if (!token) return;
    await submitDocumentPR(path, editText, token);
    setEditing(false);
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
      <h3>{path}</h3>
      {editing ? (
        <div>
          <textarea rows={10} cols={80} value={editText} onChange={(e) => setEditText(e.target.value)} />
          <br />
          <button onClick={submitEdit}>Submit Edit PR</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <pre>{content}</pre>
          <button onClick={() => setEditing(true)} disabled={!token}>Edit</button>
        </div>
      )}
    </div>
  );
}
