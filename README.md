# Last Breath Arena (MVP)

Production-ready MVP for a **Minecraft PvP challenge platform** using **virtual Arena Credits only**.

## Compliance / Product constraints
- Arena Credits are virtual and have no cash value.
- No deposits, withdrawals, crypto, real-money wagering, escrow, or custodial cash wallet behavior.
- Competitive entertainment and rankings only.

## Stack
- Next.js 15 (App Router, TS)
- Prisma + PostgreSQL
- NextAuth Credentials
- Zod validation
- Socket.IO ready dependency
- Pino structured logging

## Setup
1. Install dependencies
   ```bash
   npm install
   ```
2. Configure env
   ```bash
   cp .env.example .env
   ```
3. Generate Prisma client and migrate
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
4. Seed demo data
   ```bash
   npx tsx prisma/seed.ts
   ```
5. Run dev server
   ```bash
   npm run dev
   ```

## Admin creation
- Seed script creates `demo1@lba.gg` as an admin.
- Promote any user by setting `role=ADMIN` in Prisma Studio.

## Plugin authentication (HMAC)
- Include raw JSON body signature in header: `x-plugin-signature`
- Signature: `hex(hmac_sha256(PLUGIN_API_SHARED_SECRET, rawBody))`
- Endpoints:
  - `POST /api/plugin/match/register-ready`
  - `POST /api/plugin/match/start`
  - `POST /api/plugin/match/result`
  - `POST /api/plugin/match/aborted`
  - `POST /api/plugin/player/link-status`

See `docs/plugin-signing.md` for payload examples.

## Required env vars
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `PLUGIN_API_SHARED_SECRET`
- `APP_NAME`
- `PLATFORM_FEE_PERCENT`
- `FEATURE_PUBLIC_CHALLENGES`
- `FEATURE_SEASONS`
