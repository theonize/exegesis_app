# Exegesis App

This project provides a simple Vite + React frontend written in TypeScript using the SWC compiler. The goal is to give non‑technical users a way to submit articles and offer reviews for the `theonize/exegesis` repository.

## Development

1. Install dependencies (requires node and npm or yarn):
   ```bash
   npm install
   # or
   yarn install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

The application now includes minimal GitHub integration. Users provide a
personal access token to authenticate, search for documents in the
`theorize/exegesis` repository, view their contents and submit or edit
markdown files via automatically generated pull requests.
