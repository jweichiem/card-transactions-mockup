# Banking Mockup

This project currently runs as the original simplified mockup flow:
- one frontend app (`apps/account`)
- one mock API server (`packages/api-server`)

The extra app workspaces (`apps/cards`, `apps/payments`) are placeholders and are not required to run the mockup.

## Run locally

From the repository root:

```bash
yarn install
yarn dev
```

`yarn dev` starts both services:
- account frontend (Vite): http://localhost:5173
- mock API server (Express): http://localhost:3001

Open http://localhost:5173 in your browser.

## Optional commands

```bash
yarn dev:account   # frontend only
yarn dev:api       # API only
yarn build
yarn lint
yarn test
```

## Requirements

- `yarn@1.22.22`
