# Dependency Patches

This project uses [`pnpm patch`](https://pnpm.io/cli/patch) to apply local modifications to dependencies. Patch files live in the `patches/` directory at the repository root.

## Current Patches

### `wouter@3.7.1.patch`

Modifies the `Switch` component in wouter to collect route paths into a
`window.__WOUTER_ROUTES__` array at runtime. Used for potential sitemap
generation from actual routes.

**Status:** Consider upstreaming or removing if not actively used.
