# @jweichiem-mockup/account

React microfrontend for the account overview experience.

## Intent

- Render card list and card-scoped transactions.
- Provide a simple amount filter for visible transactions.
- Consume data through shared hooks in `@jweichiem-mockup/api-react`.

## Current Structure

- `src/index.tsx`: app bootstrap and root render.
- `src/pages/AccountOverview/index.tsx`: main screen composition and local UI state.
- `src/components/`: presentational components for cards, filter input, and transaction list.
- `src/shared/`: local design tokens and style primitives for this app.
- `src/index.scss`: global app styles.
- `vite.config.ts`: Vite configuration.
- `tsconfig*.json`: TypeScript project configuration split for app/node contexts.

## Dependencies In Monorepo

- `@jweichiem-mockup/api-react` for data fetching hooks.
- `@jweichiem-mockup/shared-types` for shared DTO typing.

## Scripts

- `yarn workspace @jweichiem-mockup/account dev`
- `yarn workspace @jweichiem-mockup/account build`
- `yarn workspace @jweichiem-mockup/account lint`
- `yarn workspace @jweichiem-mockup/account test`
