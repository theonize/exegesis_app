import { useState } from 'react';
import { GitHubProvider } from './GitHubContext';
import Login from './components/Login';
import RepoSearch from './components/RepoSearch';
import SubmitPR from './components/SubmitPR';

export default function App() {
  const [message] = useState('Welcome to Exegesis Submission App');
  return (
    <GitHubProvider>
      <div style={{ padding: '2rem' }}>
        <h1>{message}</h1>
        <Login />
        <RepoSearch />
        <SubmitPR />
      </div>
    </GitHubProvider>
  );
}
