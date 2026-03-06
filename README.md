# ClientMiniCRM Frontend

Minimal frontend MVP for a private client tracker.

## Current stack

- Next.js 16 App Router
- TypeScript strict
- Tailwind CSS v4
- shadcn/ui primitives
- Supabase SSR auth with Google OAuth

## What the MVP currently does

- Public landing page at `/`
- Login page at `/login`
- Google OAuth callback at `/auth/callback`
- Protected client list at `/clients`
- Protected create-client page at `/clients/new`

## Development

Start the frontend:

```bash
npm run dev
```

The app runs on `http://localhost:3001`.

## Environment variables

Create `.env.local` with:

```env
NEXT_PUBLIC_SUPABASE_URL="your-supabase-project-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
API_BASE_URL="http://localhost:3000/api/v1"
```

Notes:

- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are used by both browser and server Supabase clients.
- `API_BASE_URL` must point to the backend API that serves the client resources.
- As of Friday, March 6, 2026, this frontend expects the backend API on port `3000` and the frontend on port `3001`.

## Authentication flow

1. The user opens `/login`.
2. If a server-side session already exists, the page redirects to `/clients`.
3. The Google button starts Supabase OAuth in the browser.
4. Supabase redirects back to `/auth/callback?code=...`.
5. The callback exchanges the code for a session and writes auth cookies.
6. Protected pages read the authenticated user server-side and redirect unauthenticated users to `/login`.

## Route protection

- `src/lib/supabase/auth-session-middleware.ts` refreshes the Supabase session from request cookies.
- `src/proxy.ts` is the active Next.js entrypoint used by this project to run that refresh on matching requests.
- The page-level guards still perform the final server-side redirect checks for `/login`, `/clients`, and `/clients/new`.

## Main project structure

```text
src/
  app/
    auth/callback/route.ts
    clients/page.tsx
    clients/new/page.tsx
    clients/new/actions.ts
    login/page.tsx
    page.tsx
  components/
  lib/supabase/
  proxy.ts
```

## Validation

Run lint after code changes:

```bash
npm run lint
```

## MVP boundaries

- Keep changes minimal and explicit.
- Avoid new dependencies unless approved.
- Prefer Server Components for reads.
- Prefer Server Actions for writes.
- Do not use `useEffect` for primary data fetching.
