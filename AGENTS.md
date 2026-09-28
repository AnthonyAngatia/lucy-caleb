# lucy-calleb

React + Vite + Tailwind CSS wedding invitation site, deployed to Vercel. Guest RSVPs are persisted to a Neon Postgres database.

## Development Server

The RSVP form writes to the database, so the API must be served alongside the app. Use:

- `pnpm run dev:full` — Vercel dev server (Vite + `api/` functions) on http://localhost:3000. **Use this when working on anything that touches the RSVP form.**
- `pnpm run dev` — plain Vite only. The app loads, but `POST /api/rsvp` returns 404, so the form cannot be tested.

`scripts/dev.mjs` exists because the Vercel CLI reads `.env` but silently ignores `.env.local`, where the database credentials live. It loads `.env.local` into the environment before handing off to `vercel dev`. Do not set `dev` to `vercel dev` in `package.json` — the CLI resolves the client dev command from that script and recursively invokes itself.

## Deployment

- `pnpm run deploy` — `vercel --prod`
- `vercel.json` sets `framework: vite`, `buildCommand`, and `outputDirectory`, plus a catch-all rewrite to `index.html` that excludes `/api/` so it never shadows the serverless function.

## Database

`api/rsvp.ts` is a Vercel Node serverless function that inserts into Neon Postgres over `pg`, using `DATABASE_URL`. The `rsvps` table is created on first request (`CREATE TABLE IF NOT EXISTS`), so there is no separate migration step.

- Required env var: `DATABASE_URL`. Already set in Vercel for Preview and Production, and in `.env.local` for local runs.
- Credentials must never reach the browser. Only `api/` may read `DATABASE_URL`; the client calls `POST /api/rsvp` with a JSON body and gets back a sanitized error message.
- The client shows the error and stays on the form when the write fails, so no RSVP is silently lost. Keep that behaviour if the endpoint changes.

## Project Structure

This is the canonical project structure. Start with task-relevant files below. Only follow imports or inspect other files when required, when a documented path is missing, or when the repository contradicts this guide.

- `src/main.tsx` - React entrypoint; imports `src/index.css` and mounts `src/App.tsx` into the `#root` element
- `src/App.tsx` - Primary application component and the usual starting point for UI work
- `src/index.css` - Global CSS entrypoint and Tailwind CSS v4 import
- `index.html` - Vite HTML shell containing the `#root` element and loading `src/main.tsx`
- `api/rsvp.ts` - Serverless function that validates the guest name and inserts it into the `rsvps` table
- `scripts/dev.mjs` - Loads `.env.local` into the environment, then runs `vercel dev`
- `vercel.json` - Build config and the SPA rewrite that excludes `/api/`
- `package.json` - Project dependencies and the build, development, deploy, and formatting scripts
- `vite.config.ts` - Vite configuration with React, Tailwind CSS v4, and Figma Make plugins plus the `@` alias for `src`
- `.mise.toml` - Toolchain versions for Node.js and pnpm

## Dependencies

- Runtime: React 19, React DOM 19, and `pg` for Postgres
- Styling: Tailwind CSS v4 with the `@tailwindcss/vite` plugin
- Build tooling: Vite 8, TypeScript 5.7, and `@vitejs/plugin-react`
- Formatting: oxfmt

## Styling

This project uses **Tailwind CSS v4** through the `@tailwindcss/vite` plugin configured in `vite.config.ts`. `src/index.css` imports Tailwind with `@import 'tailwindcss';`. Use Tailwind utility classes directly in JSX and put global CSS or Tailwind v4 theme customization in `src/index.css`. This scaffold does not need a Tailwind config file or PostCSS config.

`src/main.tsx` imports `src/index.css`, so global font wiring belongs in `src/index.css`. Keep CSS `@import` statements first, then add any `@font-face` rules and font-family defaults there.

## Formatting

`pnpm run format` runs oxfmt, whose defaults (2-space indent, double quotes) do **not** match this codebase (4-space indent, single quotes). Running it without arguments reformats every file and buries real changes in the diff. Pass explicit paths when formatting new code, and match the surrounding style by hand.

## Styling

This project uses **Tailwind CSS v4** through the `@tailwindcss/vite` plugin configured in `vite.config.ts`. `src/index.css` imports Tailwind with `@import 'tailwindcss';`. Use Tailwind utility classes directly in JSX and put global CSS or Tailwind v4 theme customization in `src/index.css`. This scaffold does not need a Tailwind config file or PostCSS config.

`src/main.tsx` imports `src/index.css`, so global font wiring belongs in `src/index.css`. Keep CSS `@import` statements first, then add any `@font-face` rules and font-family defaults there.
