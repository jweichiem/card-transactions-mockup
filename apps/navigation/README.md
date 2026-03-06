# @jweichiem-mockup/navigation

Microfrontend layer for global layout navigation (header + footer).

## Intent

- Provide a single place for shell-level navigation UI and behavior.
- Keep page-level microfrontends focused on page content.
- Expose a mount API so host apps can attach header/footer independently.

## Public API

- `mountNavigation({ headerRoot, footerRoot, onNavigate? })`
- `renderNavigationShell(pathname)` for optional host-side SSR of header/footer markup

## Orchestrator Contract

- Remote entry loaded by orchestrator: `/src/index.tsx`.
- Host passes roots for `navigation-header` and `navigation-footer`.

## Scripts

- `yarn workspace @jweichiem-mockup/navigation dev`
- `yarn workspace @jweichiem-mockup/navigation build`
- `yarn workspace @jweichiem-mockup/navigation lint`
- `yarn workspace @jweichiem-mockup/navigation test`
