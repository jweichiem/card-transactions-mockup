# @jweichiem-mockup/ui

Shared UI package for design tokens and reusable presentational components.

## Scope

- `src/components/`: reusable React UI primitives.
- `src/styles/`: design tokens, theme setup, and component styles.

## Usage

- Components:
  - `import { Card, InputField } from '@jweichiem-mockup/ui';`
- Styles:
  - `@use '@jweichiem-mockup/ui/styles/design-tokens' as dt;`
  - `@use '@jweichiem-mockup/ui/styles/layout';`
  - `@use '@jweichiem-mockup/ui/styles/components';`

## Scripts

- `yarn workspace @jweichiem-mockup/ui build`
- `yarn workspace @jweichiem-mockup/ui lint`
- `yarn workspace @jweichiem-mockup/ui test`
