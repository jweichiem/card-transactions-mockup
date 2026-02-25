# @jweichiem-mockup/api-server

Express API serving mock data for local development.

## Intent

- Provide a lightweight backend for frontend workspaces.
- Serve stable mock data from JSON files.
- Expose clear endpoints for cards and transactions.

## Current Structure

- `src/index.ts`: server entrypoint and port binding (`PORT` or `3001`).
- `src/app.ts`: Express app setup, middleware, health route, and 404 handling.
- `src/routes/cards.ts`: `GET /cards`.
- `src/routes/transactions.ts`: `GET /cards/:cardId/transactions`.
- `src/data/loaders.ts`: JSON file loading utilities.
- `src/data/cards.json`: mock cards dataset.
- `src/data/transactions.json`: mock transactions grouped by card id.
- `tests/app.test.ts`: API behavior tests.

## API Surface

- `GET /health` -> `{ status: "ok" }`
- `GET /cards` -> `Card[]`
- `GET /cards/:cardId/transactions` -> `Transaction[]` or `404`

## Dependencies In Monorepo

- `@jweichiem-mockup/shared-types` for shared DTO typings.

## Scripts

- `yarn workspace @jweichiem-mockup/api-server dev`
- `yarn workspace @jweichiem-mockup/api-server build`
- `yarn workspace @jweichiem-mockup/api-server lint`
- `yarn workspace @jweichiem-mockup/api-server test`
