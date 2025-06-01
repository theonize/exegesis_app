import { useEffect, useState } from 'react';
import { useGitHub } from '../GitHubContext';
import { exchangeCodeForToken } from '../oauth';

export default function Login() {
  const { token, setToken } = useGitHub();
  const [inputToken, setInputToken] = useState('');
  const [loading, setLoading] = useState(false);

  // handle OAuth callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code && !token) {
      setLoading(true);
      exchangeCodeForToken(code)
        .then((t) => {
          setToken(t);
          params.delete('code');
          const newUrl = `${window.location.pathname}?${params.toString()}`;
          window.history.replaceState({}, '', newUrl);
        })
        .finally(() => setLoading(false));
    }
  }, [token, setToken]);

  const oauthClientId = import.meta.env.VITE_GH_OAUTH_CLIENT_ID;
  const oauthUrl = `https://github.com/login/oauth/authorize?client_id=${oauthClientId}&scope=repo`;

  if (token) return <p>Authenticated with GitHub</p>;

  return (
    <div>
      <h2>GitHub Login</h2>
      {loading && <p>Authenticating...</p>}
      <button onClick={() => (window.location.href = oauthUrl)}>
        Sign in with GitHub
      </button>
      <button disabled style={{ marginLeft: '0.5rem' }}>
        Sign in with Passkey (coming soon)
      </button>
      <p>or enter a personal access token:</p>
      <input
        type="password"
        value={inputToken}
        onChange={(e) => setInputToken(e.target.value)}
      />
      <button onClick={() => setToken(inputToken)}>Login</button>
    </div>
  );
}
