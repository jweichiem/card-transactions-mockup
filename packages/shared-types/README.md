# @jweichiem-mockup/shared-types

Shared domain type contracts used across apps and packages.

## Intent

- Define canonical DTO shapes for cards and transactions.
- Prevent type drift between server, clients, and UI packages.
- Keep shared contracts lightweight and framework-independent.

## Current Structure

- `src/index.ts`: exported domain types (`CardType`, `Card`, `Transaction`).
- `tsconfig.json`: TypeScript configuration for this package.

## Usage In Monorepo

- Imported directly by `api-server`, `api-client`, and React/UI consumers.

## Scripts

- `yarn workspace @jweichiem-mockup/shared-types build`
- `yarn workspace @jweichiem-mockup/shared-types lint`
- `yarn workspace @jweichiem-mockup/shared-types test`
