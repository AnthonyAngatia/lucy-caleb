# Lucy & Calleb

Wedding invitation site with an RSVP form. React + Vite frontend on Vercel, with guest names persisted to a Neon Postgres database through a Vercel serverless function.

The site has three states, managed locally in `src/App.tsx`:

- **Invite** — names, date, time, venue, and a link to the RSVP form
- **RSVP** — name entry that posts to `POST /api/rsvp`
- **Thanks** — confirmation with the guest's name, an add-to-calendar menu, and a return link

## Requirements

- Node.js 22
- pnpm 10.34.3
- A Postgres connection string (Neon works well)
- The [Vercel CLI](https://vercel.com/docs/cli) for `dev:full` and `deploy`

Toolchain versions are pinned in `.mise.toml`:

```sh
mise install
```

## Setup

```sh
pnpm install
```

Create `.env.local` with your database credentials:

```sh
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
```

`DATABASE_URL` is the only variable the app reads, and it is only ever read by `api/`. Never expose it to the client or commit it — `.env*` is gitignored.

## Development

| Command | Description |
| --- | --- |
| `pnpm run dev` | Plain Vite dev server. The UI works, but `POST /api/rsvp` returns 404, so RSVP submissions cannot be tested. |
| `pnpm run dev:full` | Vercel dev server on http://localhost:3000. Serves the app *and* the `api/` function. **Use this for anything touching the RSVP form.** |
| `pnpm run build` | Production build into `dist/`. |
| `pnpm run preview` | Preview the production build. |
| `pnpm run deploy` | Deploy to Vercel production. |
| `pnpm run format <path>` | Format with oxfmt. Pass explicit paths — see [Formatting](#formatting). |

`scripts/dev.mjs` wraps `vercel dev` because the Vercel CLI reads `.env` but silently ignores `.env.local`, where the database credentials live. The script loads `.env.local` into the environment and then hands off to the CLI so the serverless function inherits the variables. For the same reason, `dev` in `package.json` must stay `vite` — the Vercel CLI resolves the client dev command from that script and would otherwise invoke itself recursively.

## Database

`api/rsvp.ts` creates the `rsvps` table on first request, so there is no migration step:

```sql
CREATE TABLE IF NOT EXISTS rsvps (
    id         bigserial   PRIMARY KEY,
    name       text        NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
)
```

The DDL runs behind a `pg_advisory_xact_lock` so concurrent cold starts cannot race on it, and the lock statement and `CREATE TABLE` are sent as one simple query so they share an implicit transaction.

### API

`POST /api/rsvp` is the only endpoint. Any other method returns `405`.

```sh
curl -X POST http://localhost:3000/api/rsvp \
  -H 'Content-Type: application/json' \
  -d '{"name":"Grace Wanjiku"}'
```

```json
{"ok": true, "id": "1", "name": "Grace Wanjiku", "createdAt": "2026-09-28T09:00:00.000Z"}
```

The handler validates the name before it reaches the database: it must be a string, free of control characters, non-empty after trimming and collapsing whitespace, and at most 120 characters. Failures return `400` with a `message`-free `{ "ok": false, "error": "..." }` payload; a database failure returns `500` with a generic message so connection details never reach the browser.

If the write fails, the client shows the error and stays on the form so no RSVP is silently lost. Keep that behaviour if the endpoint changes.

## Deployment

`pnpm run deploy` runs `vercel --prod`. `vercel.json` sets `framework: vite`, `buildCommand: pnpm run build`, and `outputDirectory: dist`, plus a catch-all rewrite to `index.html` that excludes `/api/` so it never shadows the serverless function.

`DATABASE_URL` must be set on Vercel for both Preview and Production environments. It is already configured.

## Project structure

```
src/main.tsx        React entrypoint; imports index.css and mounts App
src/App.tsx         All three pages and the page state machine
src/index.css       Tailwind import, theme tokens, fonts, global styles
api/rsvp.ts         Serverless function: validates the name and inserts it
scripts/dev.mjs     Loads .env.local, then runs vercel dev
vercel.json         Build config and the SPA rewrite that excludes /api/
vite.config.ts      React, Tailwind v4, Figma Make plugins, `@` alias for src
```

## Tech

- React 19 and React DOM 19
- Vite 8, TypeScript 5.7, `@vitejs/plugin-react`
- Tailwind CSS v4 via `@tailwindcss/vite` — no `tailwind.config.js` or PostCSS config
- `pg` for Postgres
- `@vercel/analytics` for page analytics

### Styling

Tailwind v4 is configured through the `@tailwindcss/vite` plugin in `vite.config.ts`, and `src/index.css` pulls it in with `@import 'tailwindcss';`. Use utility classes directly in JSX, and keep global CSS and theme customization in `src/index.css`. Colors and fonts are defined there as `@theme` tokens: forest, sage, gold, and cream for the palette, Fraunces for display type and Lato for body type. Since `src/main.tsx` imports `index.css`, font wiring belongs there too — keep the CSS `@import` statements first.

### Formatting

`pnpm run format` runs oxfmt, whose defaults (2-space indent, double quotes) do not match this codebase (4-space indent, single quotes). Running it without arguments reformats every file and buries real changes in the diff. Pass explicit paths when formatting new code, and match the surrounding style by hand.

## Notes

`AGENTS.md` documents conventions for agents working in this repo and is kept in sync with the guidance above.
