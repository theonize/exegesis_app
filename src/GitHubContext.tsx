import React, { createContext, useContext, useState } from 'react';

interface GitHubContextState {
  token: string | null;
  setToken: (token: string | null) => void;
}

const GitHubContext = createContext<GitHubContextState | undefined>(undefined);

export function GitHubProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  return (
    <GitHubContext.Provider value={{ token, setToken }}>
      {children}
    </GitHubContext.Provider>
  );
}

export function useGitHub() {
  const ctx = useContext(GitHubContext);
  if (!ctx) throw new Error('useGitHub must be used inside GitHubProvider');
  return ctx;
}
