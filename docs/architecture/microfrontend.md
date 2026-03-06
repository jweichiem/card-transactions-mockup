# Microfrontend Decision

## Scope

A dedicated `@jweichiem-mockup/navigation` microfrontend owns shell-level header/footer UI and navigation behavior.

## Composition Decision

Decision: **Compose microfrontends in `orchestrator` over separate origins in dev**.

### Rationale

- This preserves strict boundaries: `account` does not import `navigation`.
- It better emulates ESI/fragment integration because each app runs on its own port and is loaded cross-origin.
- It exposes CORS and runtime-contract issues earlier, which is valuable for portfolio architecture storytelling.
- Each microfrontend remains independently runnable for isolated development.
- Current account contract is bootstrap-style (`/src/index.tsx` expecting `#account-overview` in host DOM).

### Revisit Criteria

Revisit this if one of these changes:

- We need true server-side fragment assembly (edge/ESI) in production.
- We need shared auth/session propagation that requires a backend-for-frontend.
- Runtime remote loading proves too unstable and we move to a build-time federation model.
