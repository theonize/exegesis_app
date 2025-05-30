import { useState } from 'react';

export default function App() {
  const [message] = useState('Welcome to Exegesis Submission App');
  return (
    <div style={{ padding: '2rem' }}>
      <h1>{message}</h1>
      <p>
        This app allows non-technical users to submit new papers, review
        existing content, and create pull requests against the
        <code>theonize/exegesis</code> repository.
      </p>
      <p>
        TODO: Implement GitHub authentication and interactions with the repo.
      </p>
    </div>
  );
}
