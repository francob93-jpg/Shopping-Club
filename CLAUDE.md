# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

SaaS multi-tenant de club de beneficios para shoppings. Cada shopping es un tenant independiente. Se vende como servicio mensual a múltiples shoppings.

## Two separate apps

```
apps/client/   → app de empleados  (futuro: app.dominio.com)
apps/admin/    → panel del shopping (futuro: admin.dominio.com)
```

Each app is an independent Vite project with its own `package.json`. Commands must be run from within the app folder.

## Dev commands

```bash
# App de empleados (puerto 5173+)
cd apps/client
npm run dev
npm run build
npm run lint

# Panel admin (puerto 5174+)
cd apps/admin
npm run dev
npm run build
npm run lint
```

No hay test runner configurado aún.

## Architecture

**Multi-tenant model:** All data is scoped by `shopping_id`. When Supabase is connected, Row Level Security policies must enforce this isolation — no cross-tenant data leaks.

**Auth:** Currently mocked in `AuthContext.jsx` using localStorage. Will be replaced with Supabase Auth. The `useAuth()` hook provides `{ user, loading, login, logout }` throughout both apps.

**Spin state (roulette):** Stored in localStorage keyed by credential number:
- `spin_date_<credential>` — date string of last spin
- `spin_prize_<credential>` — prize label won

The `/verificar` page reads these same keys to show stores what a user won. Both must stay in sync. When connecting Supabase, both will read from a `spins` table instead.

**Public route:** `/verificar` requires no login. It's used by store employees to validate a customer's credential and see their prize. All other routes are protected.

## Key files

| File | Purpose |
|------|---------|
| `apps/client/src/context/AuthContext.jsx` | Mock auth + session persistence. Replace login function with Supabase when ready |
| `apps/client/src/lib/supabase.js` | Supabase client — needs `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` env vars |
| `apps/client/src/pages/Verificar.jsx` | Public store verification page — reads localStorage spin data |
| `apps/client/src/pages/Ruleta.jsx` | Roulette with 1-spin-per-day logic — writes localStorage spin data |
| `apps/admin/src/context/AuthContext.jsx` | Separate admin auth (different localStorage key: `admin_user`) |

## Environment variables

Create `.env` in each app folder:

```
# apps/client/.env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# apps/admin/.env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## Current state (as of 2026-04-11)

All data is mock — hardcoded in components and localStorage. Supabase is installed but not connected. The planned DB tables are: `shoppings`, `users`, `benefits`, `prizes`, `spins`.

The root-level `src/` folder and `apps/client-src/` are **prototypes from initial development** and should be ignored — the active code lives only in `apps/client/` and `apps/admin/`.
