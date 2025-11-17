
# PlusCurriculo — Netlify production-ready bundle

This package is preconfigured for Netlify functions, Google OAuth and Supabase Postgres.
I used the Netlify project name you provided (`pluscurriculo`) and set SITE_URL to `https://pluscurriculo.netlify.app` — please verify this is the correct site URL in your Netlify settings.

## Required Netlify Environment Variables (set in Site settings -> Build & deploy -> Environment)
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- JWT_SECRET (a long random string used to sign JWTs)
- SITE_URL (if different from https://pluscurriculo.netlify.app, set it)

## SQL (create profiles table)
Run the SQL below in Supabase SQL editor:
```
create table if not exists public.profiles (
  id text primary key,
  email text,
  full_name text,
  avatar_url text,
  inserted_at timestamptz default now()
);
```

## How it works (production-ready)
- OAuth flow runs in Netlify Functions.
- After exchanging code, server signs a JWT and sets it as an HTTP-only Secure cookie (`session`) with SameSite=Lax and Max-Age=7 days.
- Frontend requests `/.netlify/functions/get-profile` which reads cookie and returns profile.
- Logout clears cookie.

## Deploy
1. `npm install` locally.
2. `npm run build` to test build.
3. Push to your GitHub repo and connect to Netlify (or drag & drop the build folder).
4. Ensure Netlify Functions are enabled (netlify.toml included).

## Notes / Security
- Keep `SUPABASE_SERVICE_ROLE_KEY` and `GOOGLE_CLIENT_SECRET` secret.
- In production, consider rotating JWT_SECRET periodically and using short-lived tokens + refresh flow.
