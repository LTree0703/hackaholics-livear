# LiveAR Sky Tours (aura)

A modern Next.js app for AR-enhanced low-altitude urban tours. The project demonstrates a small travel/tour booking platform focused on eVTOL/helipad-based experiences around Hong Kong, with a rich client UI, map components, Clerk authentication, and a Postgres/Neon backend accessed with serverless SQL and Prisma.

This README documents how to run the project locally, apply database migrations, and the important architecture notes you need to understand and contribute.

## Quick overview

- Next.js 16 (App Router)
- React 19
- Tailwind CSS (via PostCSS)
- Authentication: Clerk (@clerk/nextjs + @clerk/clerk-react)
- Database: PostgreSQL (Neon compatible) via @neondatabase/serverless and Prisma ORM
- Maps: Leaflet + react-leaflet (client-side only map component)

Key features implemented in this repo:

- Home / marketing pages with an interactive Helipad map (`src/components/HelipadMap.js`)
- Tour data and helper functions for creating/fetching tours (`src/lib/tour.js`, `src/lib/tourData.js`)
- Serverless SQL wrapper using Neon (`src/lib/server.js`) and Prisma client at `src/lib/prisma.js`
- Basic user CRUD and get-or-create logic for Clerk users (`src/lib/user.js`)

## Getting started (development)

Prerequisites

- Node.js (18+ recommended)
- npm (or yarn/pnpm)
- A PostgreSQL-compatible database. Neon (https://neon.tech) is used in the project via `@neondatabase/serverless`.
- Clerk account for authentication (optional for local development but required for auth flows)

Clone and install

```bash
git clone https://github.com/LTree0703/hackaholics-livear.git
cd hackaholics-livear
npm install
```

Environment

Create a `.env.local` in the project root (Next.js standard). The project expects at least the following variables:

- DATABASE_URL - Postgres connection string (Neon recommended for parity with production)
- (Clerk) CLERK_FRONTEND_API, CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY, NEXT_PUBLIC_CLERK_... — see Clerk docs for exact keys used by your integration

Optional developer variables seen in the code/comments:

- DATABASE_LOCATION - when set to `local` the Neon configuration in `src/lib/server.js` has commented guidance for local dev

Example `.env.local` (do NOT commit secrets):

```bash
DATABASE_URL=postgres://user:pass@your-host:5432/dbname
# Clerk values (replace with your keys)
CLERK_FRONTEND_API=your-clerk-frontend-api
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

Database setup

This repository contains Prisma schema and migration files under `prisma/`.

Apply migrations (production/CI):

```bash
npx prisma generate
npx prisma migrate deploy
```

Or for a quick local push (schema -> db without generating a named migration):

```bash
npx prisma db push
```

If using Neon, provide the Neon connection string in `DATABASE_URL`. The project uses `@neondatabase/serverless` in `src/lib/server.js` which expects the connection string to work with the Neon client.

Generate Prisma client (the generator points to `src/generated/prisma`):

```bash
npx prisma generate
```

Run the app

```bash
npm run dev
```

Open http://localhost:3000 in your browser. The app uses a combination of server and client components — for example the Helipad map is client-only and dynamically imported to avoid SSR issues.

## Scripts

Key npm scripts from `package.json`:

- `npm run dev` - start Next.js dev server
- `npm run build` - build the Next.js app
- `npm run start` - run the built app
- `npm run lint` - run ESLint

## Important files & architecture notes

- `src/app/` — Next.js App Router pages and layout. `src/app/page.js` is the landing page.
- `src/components/HelipadMap.js` — client-side Leaflet map showing helipad locations (dynamically loads Leaflet to avoid SSR issues).
- `src/lib/server.js` — Neon serverless SQL wrapper (exports `sql`). This file reads `process.env.DATABASE_URL` and includes helpful comments for local Neon config.
- `src/lib/prisma.js` — Prisma client singleton wiring used by server code.
- `src/lib/tour.js` and `src/lib/tourData.js` — helper functions and in-repo sample tour data.
- `src/lib/user.js` — helper functions for user creation and lookup (used with Clerk-authenticated users).
- `prisma/schema.prisma` — database schema (User, Tour, Booking models). Migrations are stored in `prisma/migrations/`.

Authentication

The project is integrated with Clerk for authentication (`@clerk/nextjs` and `@clerk/clerk-react`). Clerk must be configured with your account keys. The app references the logged-in user and calls `getOrCreateUser` (in `src/lib/user.js`) to create a user record in the database if necessary.

Maps and client-only components

Leaflet is loaded dynamically in `HelipadMap` to avoid server-side rendering issues. The project depends on external marker image URLs — ensure your environment can access CDN assets.

Prisma & migrations

Prisma is configured to generate its client into `src/generated/prisma` (see `prisma/schema.prisma`). The repository already includes migration SQL files under `prisma/migrations/` — run `npx prisma migrate deploy` to apply them.

Seeding data

There is sample tour data in `src/lib/tourData.js`. Seeding utilities live in `src/lib/tour.js` (functions like `createTour` and `createTours`). A small ad-hoc script or a `scripts/seed.js` file can import those functions and call them after your database is migrated.

Example quick-seed (create `scripts/seedTours.mjs` and run it):

```js
// scripts/seedTours.mjs
import { createTours } from '../src/lib/tour.js';
import tourData from '../src/lib/tourData.js';

await createTours(tourData);
console.log('seeded tours');
```

Run it with:

```bash
node --experimental-modules scripts/seedTours.mjs
```

NOTE: Adjust Node flags as needed for your Node version or use a simple script that imports CommonJS.

Deployment

This project is a good fit for Vercel (Next.js), or any host that supports Next.js builds and environment variables. When deploying:

- Ensure `DATABASE_URL` points to your production database (Neon or another Postgres provider).
- Configure Clerk environment variables in your hosting platform.
- Run `npx prisma migrate deploy` in your deployment pipeline (or apply migrations beforehand).

Troubleshooting

- If maps fail to render, verify Leaflet is loaded client-side (check console errors) and CDN images are reachable.
- Authentication issues often stem from missing Clerk keys — confirm Clerk environment variables are present and correct.
- Database connection issues: confirm `DATABASE_URL` syntax, and if you use SSL or special Neon settings, consult `src/lib/server.js` comments.

File tree (high-level)

```
aura/
├─ prisma/
│  ├─ schema.prisma
│  └─ migrations/
├─ src/
│  ├─ app/ (Next.js app routes & pages)
│  ├─ components/HelipadMap.js
│  ├─ lib/ (prisma, neon sql wrapper, tour and user helpers)
│  └─ actions/ (empty placeholders for actions)
├─ package.json
└─ README.md (this file)
```

Contributing

If you'd like to contribute:

1. Open an issue describing the change.
2. Create a branch from `main` and open a PR.
3. Add small, focused commits and include tests when possible.

License

This repository currently does not include a license file. Add a `LICENSE` file if you intend to make the project open source.

Contact / notes

If you need help wiring Clerk or Neon, check the official docs for each provider. The project contains examples and comments (notably in `src/lib/server.js`) for local Neon debugging.

