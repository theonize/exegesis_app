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

### Configuration

Create a `.env` file in the project root and set the following environment
variable pointing to your GitHub OAuth app's client ID:

```bash
VITE_GH_OAUTH_CLIENT_ID=<your client id>
```

The application now includes minimal GitHub integration. Users can either
authenticate with GitHub via OAuth or provide a personal access token.

Unauthenticated users are still able to search the public repository and view
documents. Authentication is only required when submitting or editing files via
automatically generated pull requests.
