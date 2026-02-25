# @jweichiem-mockup/api-react

React integration layer on top of `@jweichiem-mockup/api-client`.

## Intent

- Provide reusable data hooks for React apps in the monorepo.
- Standardize loading, success, and error states for API reads.
- Keep application code focused on rendering and local UI state.

## Current Structure

- `src/index.ts`: public exports.
- `src/hooks/useCards.ts`: fetches and stores cards collection state.
- `src/hooks/useTransactionsByCardId.ts`: fetches transactions for selected card id.
- `src/types.ts`: shared hook status/error types.
- `tests/hooks.test.tsx`: hook behavior tests.

## Public API

- `useCards(client?)`
- `useTransactionsByCardId(cardId, client?)`
- `Status` and `FetchError` types

## Dependencies In Monorepo

- `@jweichiem-mockup/api-client` for network operations.
- `@jweichiem-mockup/shared-types` for DTO types (through client exports).

## Scripts

- `yarn workspace @jweichiem-mockup/api-react build`
- `yarn workspace @jweichiem-mockup/api-react lint`
- `yarn workspace @jweichiem-mockup/api-react test`
