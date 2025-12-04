# Repository Guidelines

## Project Structure & Module Organization
- Vite + React 19 app; entry in `src/main.jsx` mounts `App.jsx`.
- UI sections live in `src/components` as PascalCase files (e.g., `SectionHero.jsx`, `SectionToolbelt.jsx`); shared assets in `src/assets`.
- Global theme and Tailwind 4 tokens are defined in `src/index.css`; static files (favicons, manifest) live in `public/`.
- Product docs live in `docs/` (see `docs/prd.md` for requirements and tone).

## Build, Test, and Development Commands
- Install deps once with `npm install` (lockfile present).
- `npm run dev` — start local dev server with hot reload.
- `npm run build` — production build to `dist/`.
- `npm run preview` — serve the production bundle locally to spot bundling issues.
- `npm run lint` — ESLint (flat config) over `src/` and config files; keeps hooks and refresh rules enforced.

## Coding Style & Naming Conventions
- JavaScript/JSX with ES modules; prefer 2-space indentation, trailing semicolons, and double quotes to match current files.
- React components in PascalCase; props/state/useEffect/useMemo names in camelCase; constants UPPER_SNAKE when shared.
- Keep sections small and composable; colocate styles via Tailwind utility classes and theme tokens declared in `@theme` (e.g., `text-deepGreenText`, `bg-creamWhite`).
- ESLint extends `@eslint/js` recommended, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`; avoid unused vars unless prefixed with `_` or capitalized per rule.

## Testing Guidelines
- No automated tests are configured yet; prefer Vitest + React Testing Library when adding coverage.
- Name tests `*.test.jsx` colocated with the component or under `src/__tests__/`.
- Smoke-test animations and scroll-triggered sections manually after changes; validate both desktop (custom cursor) and mobile fallbacks.

## Commit & Pull Request Guidelines
- Use short, imperative commit titles (e.g., `Add lighter section scroll triggers`); scope in 50–72 chars.
- PRs should include: what changed, why, how to verify (commands run), and before/after screenshots for UI or animation adjustments.
- Link relevant issues/tasks; note any follow-up work (e.g., new sections, assets, or performance tweaks).
- Run `npm run lint` and, if added, tests before requesting review.
