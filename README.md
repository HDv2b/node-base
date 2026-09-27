# node-base

A baseline Node.js + TypeScript template for starting new projects, pre-wired
with linting/formatting, testing, git hooks, versioning, and CI.

## Stack

- **TypeScript** (`typescript@^6`) — strict config, compiled with `tsc --noEmit` for
  type-checking and bundled with `tsup`. *(Note: TypeScript 7's native Go
  compiler is much faster but doesn't ship a Compiler API yet, which `tsup`'s
  declaration-file generation depends on. Revisit upgrading once the ecosystem
  supports TS 7's new API — see the `@typescript/typescript6` compat shim in
  the meantime.)*
- **[tsup](https://tsup.egoist.dev/)** — bundles `src/` into dual ESM/CJS
  output with `.d.ts` files in `dist/`.
- **[tsx](https://github.com/privatenumber/tsx)** — runs/watches TypeScript
  directly during development and testing, no separate compile step.
- **`node:test` + `node:assert`** — built-in, zero-dependency test runner.
- **[Biome](https://biomejs.dev/)** — single tool for linting and formatting
  (replaces ESLint + Prettier).
- **[Husky](https://typicode.github.io/husky/) + [commitlint](https://commitlint.js.org/)** —
  enforces [Conventional Commits](https://www.conventionalcommits.org/) via a
  `commit-msg` hook.
- **[lint-staged](https://github.com/lint-staged/lint-staged)** — runs Biome on
  staged files via a `pre-commit` hook.
- **[Changesets](https://github.com/changesets/changesets)** — manages
  versioning and changelogs from conventional-commit-style PRs.
- **GitHub Actions** — CI runs lint, typecheck, test, and build on every push
  and pull request to `main`; an optional release workflow opens/updates a
  "Version Packages" PR and publishes to npm when merged (requires an
  `NPM_TOKEN` repository secret).

## Requirements

- Node.js (version pinned in [`.nvmrc`](./.nvmrc); run `nvm use`)
- [pnpm](https://pnpm.io/) `12.6.0` (see `packageManager` in `package.json`)

## Getting started

```sh
pnpm install
pnpm dev       # watch src/index.ts with tsx
```

## Scripts

| Script                 | Description                                      |
| ---------------------- | ------------------------------------------------- |
| `pnpm dev`             | Run `src/index.ts` with `tsx`, watching for changes |
| `pnpm build`           | Bundle `src/` to `dist/` (ESM + CJS + `.d.ts`) with `tsup` |
| `pnpm test`            | Run tests with Node's built-in test runner       |
| `pnpm test:coverage`   | Run tests with coverage enabled                  |
| `pnpm lint`            | Check formatting/lint issues with Biome          |
| `pnpm lint:fix`        | Fix formatting/lint issues with Biome             |
| `pnpm format`          | Format files with Biome                          |
| `pnpm typecheck`       | Type-check the project with `tsc --noEmit`       |
| `pnpm changeset`       | Record a changeset describing your change        |
| `pnpm release`         | Publish packages with pending changesets         |

## Commit messages

Commits are linted with commitlint against the
[Conventional Commits](https://www.conventionalcommits.org/) spec (e.g.
`feat: add parser`, `fix: handle empty input`, `chore: bump deps`). The
`commit-msg` git hook (via Husky) will reject non-conforming commit messages.

## Releasing

1. Run `pnpm changeset` and describe your change (patch/minor/major + summary).
2. Commit the generated file under `.changeset/` along with your change.
3. On merge to `main`, the release workflow opens or updates a "Version
   Packages" PR; merging that PR publishes the new version to npm (requires
   the `NPM_TOKEN` secret to be configured on the repository).

## Using this as a template

The fastest way, using the [GitHub CLI](https://cli.github.com/) (creates a new
repo from this template and clones it in one command):

```sh
gh repo create my-new-project --template HDv2b/node-base --public --clone
cd my-new-project
pnpm install
```

Alternatively, use GitHub's **"Use this template"** button on
[HDv2b/node-base](https://github.com/HDv2b/node-base), or clone it and re-init git:

```sh
git clone https://github.com/HDv2b/node-base.git my-new-project
cd my-new-project
rm -rf .git
git init
```

Then update `package.json` (`name`, `description`, `author`, `repository`) and
replace the contents of `src/index.ts`.
