# @jweichiem-mockup/account

React microfrontend for the account overview experience.

## Intent

- Render card list and card-scoped transactions.
- Provide a simple amount filter for visible transactions.
- Consume data through shared hooks in `@jweichiem-mockup/api-react`.

## Current Structure

- `src/index.tsx`: app bootstrap and root render (entry contract used by orchestrator remote loading).
- `src/pages/Overview/index.tsx`: main screen composition and local UI state.
- `src/components/`: app-specific components for the amount filter and transaction list.
- `src/index.scss`: imports normalize and shared design-system styles.
- `vite.config.ts`: Vite configuration.
- `tsconfig*.json`: TypeScript project configuration split for app/node contexts.

## Orchestrator Contract

- Remote entry loaded by orchestrator: `/src/index.tsx`.
- Expected host root element id: `account-overview`.

## Dependencies In Monorepo

- `@jweichiem-mockup/api-react` for data fetching hooks.
- `@jweichiem-mockup/shared-types` for shared DTO typing.
- `@jweichiem-mockup/ui` for shared design tokens and card UI.

## Scripts

- `yarn workspace @jweichiem-mockup/account dev`
- `yarn workspace @jweichiem-mockup/account build`
- `yarn workspace @jweichiem-mockup/account lint`
- `yarn workspace @jweichiem-mockup/account test`
