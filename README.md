# Banking Mockup Monorepo

Workspace monorepo using Yarn workspaces.

## Workspaces

- `apps/account`: account overview frontend (Vite + React)
- `apps/payments`: placeholder microfrontend workspace
- `apps/cards`: placeholder microfrontend workspace
- `packages/api-server`: Express mock API server
- `packages/api-client`: typed API SDK for frontends
- `packages/api-react`: reusable React hooks over `api-client`
- `packages/shared-types`: shared API DTO contracts

## Root scripts

- `yarn dev:account`
- `yarn dev:api`
- `yarn dev` (runs account + api server in parallel)
- `yarn build`
- `yarn lint`
- `yarn test`

## Notes

This repo expects `yarn@1.22.22`.
If dependencies are missing locally, run `yarn install` from the repository root.
