# @jweichiem-mockup/orchestrator

Composition host for microfrontends.

## Intent

- Load shell/page microfrontends from remote origins at runtime.
- Mount shell microfrontend (`navigation`) and page microfrontends per route (`account` currently).
- Keep each microfrontend independently runnable while validating integration here.

## Remote Origins

- `VITE_NAV_REMOTE_ORIGIN` (default: `http://localhost:4174`)
- `VITE_ACCOUNT_REMOTE_ORIGIN` (default: `http://localhost:4173`)

## Remote Entrypoints

- Navigation: `${VITE_NAV_REMOTE_ORIGIN}/src/index.tsx`
- Account: `${VITE_ACCOUNT_REMOTE_ORIGIN}/src/index.tsx`

Both remotes must allow cross-origin module requests from orchestrator origin (`http://localhost:4175` by default).

## Scripts

- `yarn workspace @jweichiem-mockup/orchestrator dev`
- `yarn workspace @jweichiem-mockup/orchestrator build`
- `yarn workspace @jweichiem-mockup/orchestrator lint`
- `yarn workspace @jweichiem-mockup/orchestrator test`
