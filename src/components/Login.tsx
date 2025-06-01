import { useState } from 'react';
import { useGitHub } from '../GitHubContext';

export default function Login() {
  const { token, setToken } = useGitHub();
  const [inputToken, setInputToken] = useState('');

  if (token) return <p>Authenticated with GitHub</p>;

  return (
    <div>
      <h2>GitHub Login</h2>
      <p>Enter a personal access token to authenticate.</p>
      <input
        type="password"
        value={inputToken}
        onChange={(e) => setInputToken(e.target.value)}
      />
      <button onClick={() => setToken(inputToken)}>Login</button>
    </div>
  );
}
