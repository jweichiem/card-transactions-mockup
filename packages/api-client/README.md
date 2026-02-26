# @jweichiem-mockup/api-client

Framework-agnostic TypeScript client for the mock API server.

## Intent

- Centralize HTTP calls and error handling for API consumers.
- Keep transport concerns out of UI packages.
- Re-export shared DTO types for downstream convenience.

## Current Structure

- `src/index.ts`: client factory, API interfaces, error type, and exports.
- `tests/index.test.ts`: unit tests for client behavior.
- `vitest.config.ts`: test configuration.

## Public API

- `createApiClient(options?)`
- `ApiError`
- `ApiClient` / `ApiClientOptions`
- Re-exported `Card` and `Transaction` types

## Default Behavior

- Uses `http://localhost:3001` as default `baseUrl`.
- Throws `ApiError` for non-2xx responses and attempts to surface server error messages.

## Dependencies In Monorepo

- `@jweichiem-mockup/shared-types` for DTO contracts.

## Scripts

- `yarn workspace @jweichiem-mockup/api-client build`
- `yarn workspace @jweichiem-mockup/api-client lint`
- `yarn workspace @jweichiem-mockup/api-client test`
