# Design Tokens

This document outlines the architecture of the design tokens, a basic setup to mimic a potential design system structure.

## Colors

Color tokens are structured as representing `rgba()`  following the syntax of `rgba(rrr ggg rbbb / opacity)`.

Logically speaking global tokens would generally be defined as well, but for simplicity's sake only alias tokens are defined to enable easy theme switching for dark mode.

This system comes with the tradeoff of not being able to directly visualize the colours in a code editor.

## Space tokens

Space tokens are defined with some simple categorisation to enable logic.

Global tokens are unprefixed while spacing types are prefixed with a single letter based on which category they belong to.

The following categories have been declared to begin with:

- Component `c-`
- Gap/gutter `g-`
- Layout `l-`

Where the logic is that:

`c-` spacing is intended for smaller components internal padding and margins.
`g-` spacing is intended for grids.
`l-` spacing is intended for layouts.

`block-start/end` represent top/bottom spacing
`inline-start/end` represents left/right spacing

For layout spacing a combined block + inline spacing variable has been defined:

For example: `--l-spacing-lg: var(--l-spacing-block-lg) var(--l-spacing-inline-lg);`