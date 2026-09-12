# Sports Store Back End

Modular `Node.js + Express.js + MongoDB` backend for the Sports Store frontend
(`../sports-store-front-end`).

> Full architecture, data model, API contracts, and task plan live in
> `../project-plan/BACKEND_ARCHITECTURE_PLAN.md`.

## Status

- T01–T20 done: full first backend slice (auth, catalog, cart, account,
  orders, owner, baseline tests).
- No deployment automation or CI (out of scope for T20).

## Setup

```bash
npm install
cp .env.example .env   # then fill in JWT_SECRET + MONGODB_URI
npm run dev            # nodemon src/server.js
```

Required env vars (`src/config/env.js` fails fast if any are missing):

| Var | Example |
| --- | ------- |
| `NODE_ENV` | `development` |
| `PORT` | `5000` |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/sports_store` |
| `JWT_SECRET` | `long-random-secret` |
| `JWT_EXPIRES_IN` | `7d` |
| `CORS_ORIGIN` | `http://localhost:5173` |

## Scripts

| Script | What it runs |
| ------ | ------------ |
| `npm run dev` | `nodemon src/server.js` |
| `npm start` | `node src/server.js` |
| `npm test` | `vitest run` (baseline: `tests/integration/api.test.js`, 6 tests, mocked services — no DB needed) |
| `npm run test:watch` | `vitest` |
| `npm run lint` | `eslint .` |

## Architecture summary

- `src/app.js` exports `createApp()` (no `listen()` — importable by tests);
  `src/server.js` connects Mongo then listens.
- Shared envelope: success `{ success: true, data }`, errors
  `{ success: false, error: { code, message, details? } }`
  (`middlewares/error-handler.js`, `utils/app-error.js`).
- Thin controllers → services hold logic → Mongoose models; Zod validators
  via `middlewares/validate.js`; auth via `middlewares/auth.js`
  (`requireAuth` JWT bearer, `requireRole("owner")` for `/owner/*`).
- Auth: `POST /api/v1/auth/signup|login`, `GET /api/v1/auth/me`.
- Public: `GET /api/v1/products?category&search&page&limit&sort` (active only,
  limit default 12 / max 24), `GET /api/v1/products/:slug`,
  `GET /api/v1/categories`.
- Authenticated user: `/api/v1/cart`, `/api/v1/orders` (create from cart,
  clears cart, snapshots prices/addresses), `/api/v1/account/*`
  (profile, addresses, wishlist, bikes, wheels, orders history).
- Owner only: `/api/v1/owner/store`, `/owner/products`,
  `/owner/orders` + status updates, `/owner/dashboard` (counts only).
- Snapshots (cart unit price/title/image, order customer/address/items) keep
  history stable when products or addresses later change.

