# Banking Mockup

This project currently runs as the original simplified mockup flow:
- one orchestrator app (`apps/orchestrator`) for microfrontend composition
- one account microfrontend (`apps/account`)
- one navigation microfrontend (`apps/navigation`)
- one mock API server (`packages/api-server`)
- one shared UI package for design tokens/components (`packages/ui`)

The extra app workspaces (`apps/cards`, `apps/payments`) are placeholders and are not required to run the mockup.

## Run locally

From the repository root:

```bash
yarn install
yarn dev
```

`yarn dev` starts all services:
- orchestrator (Vite): http://localhost:4175
- account microfrontend (Vite): http://localhost:4173
- navigation microfrontend (Vite): http://localhost:4174
- mock API server (Express): http://localhost:3001

Open http://localhost:4175 in your browser.

The orchestrator loads account/navigation over separate origins in dev to emulate fragment-style integration and surface CORS/runtime integration issues early.

## Optional commands

```bash
yarn dev:account   # frontend only
yarn dev:navigation # navigation microfrontend only
yarn dev:orchestrator # composition host only
yarn dev:api       # API only
yarn build
yarn lint
yarn test
```

## Testing

Testing is run with Vitest in each workspace. From the repo root:

```bash
yarn test
```

That command runs `yarn workspaces run test`, which executes each workspace's `test` script (for example `vitest run`, and some packages use `--passWithNoTests`).

To run tests for a single workspace:

```bash
yarn workspace @jweichiem-mockup/account test
yarn workspace @jweichiem-mockup/api-server test
```

To run a specific test file or pattern, pass arguments through to Vitest:

```bash
yarn workspace @jweichiem-mockup/account test -- Card.test.tsx
```

## Requirements

- `yarn@1.22.22`
