# Project guidance

This repository may be the source template or a project created from it. If maintaining the template, choose defaults that give new projects clear, early feedback. In a generated project, follow that project's own deployment and package compatibility needs; update or remove this guidance as the project evolves.

## Updating Node.js

- Verify the current Node.js LTS release and support schedule from the official Node.js site before choosing a new development baseline.
- Treat `.nvmrc` as the development version selected by local version managers and CI. It does not set the runtime requirement for users who install a published package.
- Treat `package.json` `engines.node` as a runtime compatibility claim. For a published package, base its minimum on the oldest runtime the built package actually supports and tests. For an app, match its deployment environment. Do not add a major-version upper bound solely to match `.nvmrc`.
- Keep `devEngines.runtime`, `@types/node`, the build target, CI and release workflows, README, and the lockfile consistent with the intended development and runtime versions. Update only settings that apply to this project; the development and runtime versions need not match.
- Check whether package-manager settings turn version guidance into a hard install failure. Use strict enforcement only when it is intentional.
- After an update, run the frozen-lockfile install, lint, typecheck, tests, and build. If `engines.node` continues to allow an older runtime, test the built package on that minimum runtime in CI before claiming support.
