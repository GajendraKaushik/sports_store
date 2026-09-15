# Sports Store

A bike-shop e-commerce app — customer storefront + owner panel, built end-to-end.

**Live demo →** [Frontend](https://sports-store-woad.vercel.app) · [API](https://sports-store-api.onrender.com)

> Browse products, manage a cart, place orders. Owner can manage products, update order status, and edit the store — all against the same API with different permissions.

**Stack:** React 18 · Vite · Tailwind CSS · Node.js · Express · MongoDB · Mongoose · Zod · JWT · Vitest + Supertest

---

## What this is

Most "e-commerce" demos stop at product listing and a fake cart. This one goes further:

- The **server owns the cart**. Prices are locked at add-to-cart time — the client never computes totals.
- **Filter counts are live** — "Mountain Bikes (84)" comes from a real Mongo aggregation, not a hardcoded string.
- **Two separate users**, one API — a shopper on the storefront and an owner in the admin panel, each with their own auth guard and UI.
- Fully functional with **placeholder images** — swap in real photos without touching code.

Checkout is intentionally out of scope (no payments). Everything else works end-to-end against a live API.

---

## Run it locally

You'll need Node 18+ and a MongoDB instance.

```bash
# Terminal 1 — backend
cd sports-store-back-end
npm install
cp .env.example .env   # fill in JWT_SECRET and MONGODB_URI
npm run seed           # seeds 19 products across 8 categories
npm run dev            # starts on port 5001 (macOS: AirPlay owns 5000)

# Terminal 2 — frontend
cd sports-store-front-end
npm install
cp .env.example .env   # set VITE_API_URL to match the backend port
npm run dev            # http://localhost:5173
```

---

## Project structure

Two apps in one repo — frontend and backend talk over a versioned JSON API (`/api/v1`).

```
sports-store-front-end/          sports-store-back-end/
├── src/assets/components/       ├── src/routes/        /api/v1 endpoints
│   ├── Product/                 ├── src/controllers/   thin handlers
│   ├── Owner/                   ├── src/services/      business logic
│   └── Layout_Pages/            ├── src/models/        mongoose schemas
├── src/hooks/     data layer    ├── src/validators/    zod schemas
├── src/services/  rules layer   ├── src/middleware/    auth + errors
└── src/api/       api layer     └── src/seed/          demo data + images
```

**Frontend data flow (one direction only):**

```
Component → hook → service → api → lib/api.js (fetch)
```

Components never call `fetch`. Hooks own loading/error state. Services hold pure logic. This boundary means I can swap in TanStack Query later without touching a single component.

**Every API response has the same shape:**

```json
{ "success": true, "data": { ... } }
{ "success": false, "error": { "message": "...", "code": "VALIDATION_ERROR" } }
```

The frontend branches on `err.code` — so `NOT_FOUND` on a bad product slug shows a different message than a network failure.

---

## Key decisions (and why)

### 1. The server owns the cart — always

When you add an item, the server stores `unitPriceSnapshot`, `titleSnapshot`, and `imageSnapshot` on that cart line. The subtotal comes back from the API; the UI just renders it.

Why: if a product's price changes tomorrow, existing carts aren't affected. And there's no way for a client to lie about the price. This one decision settled an entire category of "what if" questions.

### 2. Filters travel as CSV query params

```
GET /products?categories=mountain-bikes,road-bikes&sizes=M,L&priceRanges=500-1000
```

Not arrays-in-JSON, not POST bodies. GET requests stay shareable and cacheable. The frontend just does `selected.sizes.join(",")`.

### 3. A separate endpoint for filter counts

```
GET /products/facets?category=mountain-bikes
```

Returns `{ value, label, count }` per filter group, scoped to the current category. "Road Bikes (12)" is true right now — not true at seed time. Hardcoding this was the obvious shortcut; it would have been wrong within a week.

### 4. "Featured" is a sort, not a page

Products have `isFeatured` + `featuredOrder` fields the owner can set. `sort=featured` orders by those; `sort=newest` is `createdAt desc`. The API ships with no default sort — it returns natural order until the user picks something. That's honest: the catalog shouldn't pretend to be curated before it is.

### 5. Zod at every boundary

Query strings and request bodies each have a Zod schema. Failures always return `VALIDATION_ERROR` with field-level details. Route handlers stay thin — they validate, call a service, return.

### 6. JWT in localStorage — a deliberate tradeoff

I know the XSS argument for `httpOnly` cookies. For this scope, the simpler client approach made sense, and the auth code is isolated to `lib/api.js` + `AuthContext`. Moving to cookie + CSRF is a contained swap if this were going to production.

---

## Features

**Storefront**
- Category tiles → product listing with live facet counts
- Filter panel: category, group, size, price, collection — all as CSV params
- Slug-based product detail: image gallery, size picker, stock readout, compare-at price
- Cart: quantity stepper, save for later, move wishlist items back to cart
- Auth: signup/login, profile, address book, order history
- 401 on any protected action redirects to login with a return path

**Owner panel**
- Product CRUD: draft / active / archived status, category picker
- Order pipeline: pending → confirmed → shipped → delivered
- Store profile editing
- All owner routes enforced server-side, not just hidden in the UI

---

## Tests

```bash
cd sports-store-back-end && npm test
```

Backend integration tests run the real Express app with Supertest against a throwaway Mongo database:

- Signup validates correctly; bad payloads return `VALIDATION_ERROR`
- Product listing is public; filtering + pagination work without auth
- Cart mutations require auth and hit the actual server state
- Order creation requires auth and a non-empty cart
- Owner-only routes reject non-owners

**Honest gap:** The frontend has no automated tests — it's been verified manually, flow by flow. The next thing I'd add is Playwright around the core path (browse → pick a size → add to cart → login → cart persists), because that's the flow where a broken build hurts most.

---

## Deployment

Two services, one repo. Each platform's "root directory" points at its folder.

| Piece | Platform | Notes |
|---|---|---|
| Frontend | Vercel | Root: `sports-store-front-end` · `VITE_API_URL` set at build time |
| Backend | Render (free tier) | Root: `sports-store-back-end` · start: `npm start` |
| Database | MongoDB Atlas M0 | Network access: `0.0.0.0/0` for Render |

Two things I had to handle explicitly:

**SPA deep links** — Vercel needs a `vercel.json` rewrite to `/index.html`, or refreshing `/products/some-bike` 404s.

**Free-tier cold starts** — Render sleeps after idle. First load after a gap waits ~30–60s while the backend boots. A cron ping or paid instance fixes it.

---

## Things I learned building this

**Put the trust boundary where the money is.** The price-snapshot design settled a whole class of "what if the price changes / what if the client lies" questions in one move. Every other cart decision got easier after that.

**Mongoose has reserved schema paths.** I named a field `collection` and got a runtime warning — `Document` already uses it. Still worked, but I check the framework's namespace before naming domain fields now.

**macOS owns port 5000.** AirPlay Receiver binds it silently. This project standardizes on 5001 and documents it in `.env.example`. Saved anyone who clones this an hour of `EADDRINUSE` confusion.

**CSS stacking contexts bite exactly when you demo.** The filter dropdown kept rendering behind the product grid. A `sticky` header and a later-in-DOM grid created their own stacking layers. Fixed with `z-30` on the toolbar and `z-50` on the dropdown. CSS layering isn't hard — it's just invisible until it isn't.

**The cancelled-flag pattern works; AbortController is cleaner.** Every fetch effect uses a `cancelled` boolean today. Gets the job done, but I'd use `AbortController` on the next pass so in-flight requests actually cancel instead of being silently ignored.

**Write the boring `.env` comments.** Half the setup questions I could anticipate (which port, no trailing slash on the CORS origin, `PUBLIC_BASE_URL` must match the deployed backend) are answered in `.env.example` — which is where they should live, not in my head.