// useGitHubAuth.ts
export function useGitHubAuth() {
  const login = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID&scope=repo`;
  };

  const handleCallback = async () => {
    const code = new URLSearchParams(window.location.search).get("code");
    // Send `code` to your backend to exchange for an access_token
  };

  return { login, handleCallback };
}
