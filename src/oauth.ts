export async function exchangeCodeForToken(code: string): Promise<string> {
  const res = await fetch(`/api/oauth/github?code=${encodeURIComponent(code)}`, {
    method: 'POST',
  });
  if (!res.ok) {
    throw new Error('OAuth token exchange failed');
  }
  const data = await res.json();
  if (!data.token) {
    throw new Error('Missing token in OAuth response');
  }
  return data.token as string;
}
