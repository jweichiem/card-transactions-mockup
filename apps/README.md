# Apps Workspace Conventions

Each folder in `apps/` is an isolated microfrontend workspace.

## Rules

- Keep routes isolated to the app workspace; no direct cross-app route imports.
- Use shared API hooks from `@jweichiem-mockup/api-react` for cards/transactions data.
- Do not import source files from another app directly.
- Reusable DTOs should come from `@jweichiem-mockup/shared-types`.
- Shared server access should go through `@jweichiem-mockup/api-client` (or `api-react` for React apps).

## New App Template

- `package.json` with local `dev`, `build`, `lint`, and `test` scripts.
- `src/` for app-specific UI and route composition.
- No direct imports from sibling app folders.
