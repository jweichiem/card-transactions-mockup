# Banking Mockup

- Project is configured with `React` + `Typescript` through Vite with React Compiler.
- `eslint` has been replaced with `biomejs` to simplify config for linting and formatting and reduce dependencies.
- `sass` has been installed to enable sass.
- `yarn@1.22.22` has been used for package management.


## Linting, formatting and assist

Biome has been configured with some basic additions to keep the linting/formatting simple. It can be swapped out for eslint if preferred.

Make sure your code editor has the biome extension to be able to take advantage of it, you can also configure your code editor to format on save.

tsconfig has been left with the default config from the base Vite template.

## Task

The purpose of this task is to build a card and transactions overview page. The user should be able to select one of the cards, see it's transactions and be able to filter the transactions based on the amount.