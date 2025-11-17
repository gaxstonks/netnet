# GAX Currículos - Netlify Conversion

This project is a React + Vite frontend with Netlify Functions for backend logic.

## Features
- Signup / Login (bcrypt + JWT) via Netlify Functions
- Stripe checkout and webhook placeholders
- Notify-payment API to set plan on user
- Downloads protected based on user.planActiveUntil
- Prisma schema included for Postgres/SQLite usage in Netlify Functions

## How to deploy
1. Install dependencies locally to test:
   ```bash
   npm install
   npx prisma generate
   npx prisma migrate dev --name init # if using SQLite locally
   npm run dev
   ```
2. Create a GitHub repo, push the files, connect to Netlify.
3. Set Netlify environment variables:
   - DATABASE_URL (e.g. file:./dev.db for local, or postgres URL for production)
   - JWT_SECRET (random string)
   - STRIPE_SECRET_KEY
   - STRIPE_WEBHOOK_SECRET
   - SUCCESS_URL, CANCEL_URL (optional)
4. Netlify build will run `npm run build` and publish `dist`.

## Notes about Prisma on Netlify
- For production use a Postgres database (Supabase, Neon, Railway).
- Avoid intensive connection pooling on serverless functions; Prisma client is set up with a global instance in `netlify/functions/lib_prisma.js` to minimize cold-start issues.

If any build errors occur on Netlify, copy the build log and paste here; I will fix them and provide an updated ZIP.
