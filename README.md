# GAX Currículos - Netlify Complete

This package contains a full React + Vite frontend plus Netlify Functions implementing:
- Signup / Login (bcrypt + JWT)
- Google OAuth (placeholders, requires client id/secret and redirect)
- Admin panel (promote users using ADMIN_SECRET)
- Templates editor (choose template, edit fields, drag reorder sections, export JSON)
- Stripe Checkout & Webhook placeholders
- Prisma schema (SQLite example) and helper for serverless

## Environment variables (set in Netlify)
- DATABASE_URL (e.g. file:./dev.db for local, or postgres URL)
- JWT_SECRET (random string)
- ADMIN_SECRET (secret to promote admins)
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- GOOGLE_REDIRECT (e.g. https://your-site.netlify.app/.netlify/functions/oauth-google-callback)
- APP_URL (frontend base URL)
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- SUCCESS_URL, CANCEL_URL

## Deploy
1. Create a GitHub repo and push these files.
2. Connect repo to Netlify (New site from Git).
3. Set Environment Variables in Site settings.
4. Deploy. Netlify will build the Vite app and deploy functions automatically.

## Local testing
1. npm install
2. npx prisma generate
3. npx prisma migrate dev --name init
4. npm run dev

If you run into errors on Netlify deploy, paste the build log here and I will fix the code and reissue an updated ZIP.
