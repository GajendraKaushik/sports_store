# Frontend ↔ Backend Integration Plan

Date: September 12, 2026
Scope: migrate all frontend mock data into the backend DB and wire every UI action to real `/api/v1/*` endpoints

This plan mirrors `UI_FIX_TASKS.md` (U01–U18) and `BACKEND_ARCHITECTURE_PLAN.md` (T01–T20).
Backend T01–T20 is done. Frontend U01–U18 is done visually but still runs on mocks.
Each task below is one logical change, small enough for a 4K–8K context window,
limited to a few related files, independently executable in dependency order.

Related docs:
- `UI_FIX_TASKS.md` — what the UI looks like today
- `BACKEND_ARCHITECTURE_PLAN.md` sections E/F/G — real API contracts (source of truth)
- Frontend mocks to kill: `products.mock.js`, `cart.mock.js`, hardcoded product in `Single_Product_page.jsx`, empty `user_info` in `Profile.jsx`
- Backend base: `sports-store-back-end/src/routes/index.js` (`/auth /products /categories /cart /account /orders /owner`)

---

## A. Current Integration Assessment

### Frontend state (verified)

- `Product_List_Page.jsx` renders `mockProducts` (9 items, string prices `"6,499.99"`, one shared image, legacy `Name/OfferPrice` fields).
- `Single_Product_page.jsx` hardcodes "Sirrus X 5.0 / $2,250"; `handleAddToCart` only does `navigate("/cart")` — no productId, no POST.
- `ProductCart.jsx` renders `mockCartItems/mockSavedForLaterItems`; subtotal is a local reduce — no fetch/mutation.
- `Login.jsx/SignUp.jsx` are local-state only; `App.jsx isAuthenticated() => false` always redirects `/cart` → login; no token anywhere.
- `Profile.jsx` starts from `user_info = {}`; `Address/Oders/WishList/Bikes/Wheels` are local-state only.
- All `/owner/*` routes render `OwnerPlaceholder`.

### Backend state (done, T01–T20)

- Public: `GET /products` (active-only, `limit` default 12 / max 24, `{items, pagination}`), `GET /products/:slug`, `GET /categories`.
- Auth: `POST /auth/signup|login → {token, user}`, `GET /auth/me` (`Bearer` JWT).
- User: `/cart` CRUD (snapshot pricing, merges same size), `POST /orders` (creates from cart, snapshots, clears cart), `/account/*` (profile, addresses, wishlist, bikes, wheels, orders history — all user-scoped).
- Owner: `/owner/store`, `/owner/products`, `/owner/orders` + status, `/owner/dashboard` counts (`requireAuth + requireRole("owner")`).

### Key mismatches

- Numbers vs strings: backend `price: Number`, frontend `"6,499.99"` strings + `name/offerPrice` vs `title/price`.
- Slug vs id: cards link by `slug`, but cart/orders APIs need Mongo `_id` (`productId`).
- No shared API layer, no token storage, no loaders/guards on `/account/*`.

---

## B. Target Integration Architecture

### Frontend additions (new only)

- `src/lib/api.js` — single `apiFetch()`; base URL from `import.meta.env.VITE_API_URL ?? "http://localhost:5000/api/v1"`; parses `{success, data, error}`.
- `src/lib/AuthContext.jsx` — login/signup/logout, token in `localStorage`, user via `GET /auth/me`.
- `src/lib/format.js` — `formatPrice(n, currency)` via `Intl.NumberFormat` (backend sends Numbers).

### Backend additions (new only)

- `src/seed/seed.js` + `npm run seed` — owner + store + categories + ~9 products (same slugs as mocks). Idempotent upsert by slug.

### Rules

- Backend contracts win — adapt frontend field names, never invent new shapes.
- No ad-hoc `fetch` in pages; everything via `api.js` + context.
- Keep UI look intact — swap the data source, not the layout.
- Auth-gated pages/mutations redirect logged-out users to `/auth/login`.

---

## C. Task Dependency Graph

```text
I00 -> I01 -> I02 -> I03 -> I04 -> I05
I01 -> I06 -> I07
I01 -> I07 -> I08
I05 + I07 -> I08 (orders history needs cart checkout + addresses)
I06 -> I09 (owner login needs auth infra)
I02..I09 -> I10
```

Interpretation:

- Phase 0 (I00) seeds the DB — nothing frontend can switch off mocks before this.
- Phase 1 (I01) is the shared infra — every action task depends on it.
- Phase 2 (I02–I03) kills product mocks (read-only, safe first wiring).
- Phase 3 (I04–I08) makes UI actions work: cart → auth → profile/addresses → wishlist/bikes/wheels/orders.
- Phase 4 (I09) replaces owner placeholders.
- Phase 5 (I10) proves zero mocks + green builds.

Recommended execution sequence: I00, I01, I02, I03, I04, I05, I06, I07, I08, I09, I10.

---

## D. Implementation Tasks

## Phase 0 — Backend seed: migrate mock data into MongoDB (do first) ✅ DONE

> Why first: frontend cannot drop mocks until real products exist with same slugs.
> Status: I00 implemented and verified Sep 12, 2026 — `npm run seed` upserts
> owner + store + 3 categories + 9 products; live `GET /products` total 9.

## I00

Task ID: I00
Title: Seed script + categories/store (mock migration source)
Goal: Migrate `products.mock.js` data into MongoDB so frontend can switch to real APIs.
Dependencies: T14 (product listing contract)
Files to create/modify:

- `sports-store-back-end/src/seed/seed.js` (new)
- `sports-store-back-end/package.json` (add `npm run seed`)

Required context:

- mocks: 9 items in `products.mock.js` (string prices `"6,499.99"`, legacy `Name/OfferPrice`, one shared image)
- backend expects `price: Number`, `status: active`, unique `slug`

Implementation instructions:

- create 1 owner + 1 store + categories (`bikes`, `wheels`, `components`)
- upsert ~9 products by slug (same slugs as mocks: `stumpjumper-comp-alloy`, `s-works-stumpjumper-evo`, `turbo-vado-4-0`, `turbo-como-sl-4-0`, `diverge-comp-e5`, `turbo-vado-4-0-step-through`, `roubaix-expert` x3) with numeric price/compareAtPrice, `status:"active"`, stockQuantity, sizes [XS..XXL], placeholder images[]
- idempotent (upsert by slug, safe to re-run)

API/data contracts:

- seeded data must satisfy `GET /products` + `GET /products/:slug` shapes from plan Section G

Acceptance criteria:

- `GET /products` returns >= 9 items; `GET /products/stumpjumper-comp-alloy` 200

Out of scope:

- image upload/CDN

Local Model Context:

```text
Create src/seed/seed.js only. Upsert owner/store/categories/products by slug.
Convert "6,499.99" strings to numbers. Do not touch frontend in this task.
```

## Phase 1 — Shared frontend infra (blocks everything below)

> Status: PARTIAL — `src/lib/api.js` + `src/lib/format.js` created (I02/I03 blocked on these). `AuthContext.jsx`, App.jsx guards + NavBar wiring still pending (needed by I04+).

## I01

Task ID: I01
Title: API client + auth context
Goal: Give every page one fetch helper and one session source; fix the always-redirect cart guard.
Dependencies: I00, T13 (auth contracts)
Files to create/modify:

- `sports-store-front-end/src/lib/api.js` (new)
- `sports-store-front-end/src/lib/AuthContext.jsx` (new)
- `sports-store-front-end/src/lib/format.js` (new)
- `sports-store-front-end/src/App.jsx` (guards)
- `sports-store-front-end/src/assets/components/NavBar.jsx`
- `sports-store-front-end/src/assets/components/Login/Login.jsx`
- `sports-store-front-end/src/assets/components/Login/SignUp.jsx`

Required context:

- today: no shared fetch, no token, `App.jsx isAuthenticated()=>false` redirects `/cart` to login always
- backend: `POST /auth/signup|login -> {token,user}`, `GET /auth/me` via `Bearer` JWT

Implementation instructions:

- `api.js`: `apiFetch(path,{method,body,token})`, base `VITE_API_URL ?? "http://localhost:5000/api/v1"`, parse `{success,data,error}`
- `AuthContext.jsx`: login/signup/logout, token in `localStorage`, user via `GET /auth/me`
- `format.js`: `formatPrice(n,currency)` via `Intl.NumberFormat` (backend sends Numbers)
- guard `/cart` + `/account/*`: logged-out redirects `/auth/login`
- no ad-hoc fetch in pages afterwards

API/data contracts:

- auth shapes from backend plan Section F

Acceptance criteria:

- login stores token, refresh keeps session, `/cart` opens when logged in

Out of scope:

- catalog/cart wiring (I02+)

Local Model Context:

```text
Create src/lib/* only + wire App.jsx guards and NavBar auth state.
Keep UI look intact. No product/cart logic in this task.
```

## Phase 2 — Catalog: kill product mocks ✅ DONE

> Status: I02 + I03 implemented and verified Sep 12, 2026. `products.mock.js` deleted;
> list reads `GET /products`, detail reads `GET /products/:slug` with loading/error/404.
> Verified live against backend on `:5001` (list 9 items, detail sizes/stock, 404 clean).

## I02

Task ID: I02
Title: Product list from `GET /products`
Goal: Replace `products.mock.js` with the real catalog endpoint.
Dependencies: I00, I01
Files to create/modify:

- `sports-store-front-end/src/assets/components/Product/Product_List_Page.jsx`
- `sports-store-front-end/src/assets/components/Product/Product_Card.jsx`
- `sports-store-front-end/src/assets/components/Product/products.mock.js` (delete after)

Required context:

- list page renders `mockProducts` with legacy `Name/OfferPrice` string fields
- backend `GET /products?limit=12` returns `{items:[{id,title,slug,price,compareAtPrice,currency,primaryImage}],pagination}`

Implementation instructions:

- fetch via shared `apiFetch` with loading/error/empty states
- map `title/price/compareAtPrice/primaryImage/slug` to `Product_Card`
- keep U07 card-link behaviour (`/products/:slug`)
- delete `products.mock.js` when done

API/data contracts:

- catalog shapes from backend plan Section G

Acceptance criteria:

- seeded items render; card click goes to `/products/:slug`

Out of scope:

- detail page (I03), filters/sort (later)

Local Model Context:

```text
Edit Product_List_Page.jsx + Product_Card.jsx only. Swap mock import for
GET /products. Delete products.mock.js after. Keep layout intact.
```

## I03

Task ID: I03
Title: Product detail from `GET /products/:slug`
Goal: Replace the hardcoded "Sirrus X 5.0" detail with real product data.
Dependencies: I01, I02
Files to create/modify:

- `sports-store-front-end/src/assets/components/Product/Single_Product_page.jsx`

Required context:

- detail page hardcodes one product; `handleAddToCart` only navigates, no POST
- backend `GET /products/:slug` returns full product (`id,title,price,images,sizes,specifications,stockQuantity`)

Implementation instructions:

- read `useParams().productSlug`, fetch detail, render title/price/images/sizes/specs/stock
- require size selection before add (sizes come from API)
- keep detail for add-to-cart wiring in I04 (read-only here)

API/data contracts:

- detail shape from backend plan Section G; slug lowercased; unknown slug is 404 `NOT_FOUND`

Acceptance criteria:

- refresh on URL works; unknown slug shows not-found state

Out of scope:

- add-to-cart POST (I04)

Local Model Context:

```text
Edit Single_Product_page.jsx only. Fetch by productSlug via apiFetch.
Add loading/error/404 states. Keep visual layout intact.
```

## Phase 3 — Make UI actions work (cart to account)

## I04

Task ID: I04
Title: Add to cart from detail page
Goal: Make the detail "Add to cart" button create a real cart line.
Dependencies: I01, I03, T15
Files to create/modify:

- `sports-store-front-end/src/assets/components/Product/Single_Product_page.jsx`
- `sports-store-front-end/src/assets/components/NavBar.jsx` (cart badge, if present)

Required context:

- `handleAddToCart` only does `navigate("/cart")` — no productId, no POST
- backend `POST /cart/items {productId,quantity,selectedSize}` merges same size, snapshots price

Implementation instructions:

- use detail `id` (not slug) + selected size in the POST
- logged-out users redirect to `/auth/login`; success navigates to `/cart`
- surface 404/unavailable + validation errors

API/data contracts:

- cart mutation shapes from backend plan Section F

Acceptance criteria:

- same size merges qty; cart badge updates; price comes from snapshot

Out of scope:

- cart page itself (I05)

Local Model Context:

```text
Edit Single_Product_page.jsx handleAddToCart only. POST via apiFetch with
token. Do not redesign the detail layout.
```

## I05

Task ID: I05
Title: Cart page read/update/remove/checkout
Goal: Replace `cart.mock.js` with live cart + checkout.
Dependencies: I01, I04, T15, T18
Files to create/modify:

- `sports-store-front-end/src/assets/components/Product/ProductCart.jsx`
- `sports-store-front-end/src/assets/components/Product/cart.mock.js` (delete after)

Required context:

- cart page renders `mockCartItems/mockSavedForLaterItems`; subtotal is a local reduce
- backend: `GET /cart`, `PATCH /items/:productId`, `DELETE`, saved-for-later = wishlist endpoints, checkout `POST /orders` clears cart

Implementation instructions:

- `GET /cart` on mount; stepper calls PATCH; remove calls DELETE (qty>=1 enforced server-side)
- saved-for-later uses `GET/POST/DELETE /account/wishlist/*`
- checkout calls `POST /orders` then navigates to `/account/orders/:orderId`
- delete `cart.mock.js` when done

API/data contracts:

- cart + order shapes from backend plan Sections F/G

Acceptance criteria:

- reload persists; checkout clears cart; order appears in history

Out of scope:

- order history UI (I08), payments

Local Model Context:

```text
Edit ProductCart.jsx only. Replace mock imports with apiFetch calls.
Keep totals layout; server subtotal wins over local math.
```

## I06

Task ID: I06
Title: Auth end-to-end (login/signup/sign-out)
Goal: Replace local-state auth with real JWT sessions.
Dependencies: I01, T13
Files to create/modify:

- `sports-store-front-end/src/assets/components/Login/Login.jsx`
- `sports-store-front-end/src/assets/components/Login/SignUp.jsx`
- `sports-store-front-end/src/assets/components/NavBar.jsx`

Required context:

- login/signup are local-state only; no token anywhere
- backend `POST /auth/* -> {token,user}`, `GET /auth/me`

Implementation instructions:

- call `POST /auth/*` via AuthContext, store token, load `/auth/me`
- show `VALIDATION_ERROR` details per field (email/password)
- sign-out clears token + user

API/data contracts:

- auth shapes from backend plan Section F

Acceptance criteria:

- valid login lands on account/cart; bad input shows field errors; refresh keeps session

Out of scope:

- owner login (I09)

Local Model Context:

```text
Edit Login.jsx + SignUp.jsx only. Use AuthContext, no direct localStorage.
Keep U12-U13 form layouts intact.
```

## I07

Task ID: I07
Title: Profile + addresses CRUD
Goal: Make account profile and address forms read/write real data.
Dependencies: I01, I06, T16
Files to create/modify:

- `sports-store-front-end/src/assets/components/Consumer_Details/Profile.jsx`
- `sports-store-front-end/src/assets/components/Consumer_Details/Address.jsx`

Required context:

- `Profile.jsx` starts from `user_info = {}`; Address is local-state only
- backend: `GET/PATCH /account/profile` (firstName/lastName/phone only), `/account/addresses*` CRUD + isDefault

Implementation instructions:

- Profile: `GET /account/profile` prefill, `PATCH` save with loading/error
- Address: list/create/update/delete + set-default via `/account/addresses*`

API/data contracts:

- account shapes from backend plan Sections F/G; email/role not editable

Acceptance criteria:

- profile save persists on reload; default address is unique

Out of scope:

- wishlist/bikes/wheels/orders (I08)

Local Model Context:

```text
Edit Profile.jsx + Address.jsx only. Prefill from GET, save via PATCH/POST.
Keep U16-U18 form layouts intact.
```

## I08

Task ID: I08
Title: Wishlist / bikes / wheels / orders history
Goal: Wire the remaining account pages to real endpoints.
Dependencies: I01, I05, I07, T17, T18
Files to create/modify:

- `sports-store-front-end/src/assets/components/Consumer_Details/WishList.jsx`
- `sports-store-front-end/src/assets/components/Consumer_Details/Bike_Detail_Form.jsx`
- `sports-store-front-end/src/assets/components/Consumer_Details/Wheel_Detail_Form.jsx`
- `sports-store-front-end/src/assets/components/Consumer_Details/Oders.jsx`

Required context:

- all four pages are local-state only today
- backend: `/account/wishlist*`, `GET/POST /account/bikes|wheels` (409 dup serial), `GET /account/orders` + detail (snapshots)

Implementation instructions:

- WishList to `/account/wishlist`; move-to-cart = wishlist DELETE + cart POST
- Bikes/Wheels to `GET/POST` with 409 message on duplicate serial
- Orders to `GET /account/orders` + detail view (use snapshots, not live product data)

API/data contracts:

- account/order shapes from backend plan Sections F/G

Acceptance criteria:

- wishlist add/remove persists; bike register shows in list; orders show post-checkout history

Out of scope:

- registration edits (backend has none), refunds

Local Model Context:

```text
Edit the four account pages only. One endpoint group per page.
Keep list/card layouts intact.
```

## Phase 4 — Owner UI (replaces placeholders)

## I09

Task ID: I09
Title: Owner pages on real `/owner/*` APIs
Goal: Replace `OwnerPlaceholder` with working owner dashboard/store/products/orders.
Dependencies: I01, I06, T19, T20
Files to create/modify:

- `sports-store-front-end/src/assets/components/Owner/*` (replace placeholders)
- `sports-store-front-end/src/App.jsx` (owner guard)

Required context:

- all `/owner/*` routes render `OwnerPlaceholder` today
- backend: `/owner/dashboard` counts, `GET/PATCH /owner/store`, `GET/POST/PATCH /owner/products*`, `GET /owner/orders` + status PATCH (owner-only)

Implementation instructions:

- `/owner/login` uses `POST /auth/login` (owner role); guard `/owner/*` for owner role only
- dashboard shows counts; store edit; product list/create/update; order list + status change

API/data contracts:

- owner shapes from backend plan Sections F/G

Acceptance criteria:

- user token blocked from `/owner/*`; owner price edit shows on storefront

Out of scope:

- product delete, image uploads, multi-store

Local Model Context:

```text
Replace OwnerPlaceholder pages only. Guard /owner/* by role.
One endpoint group per owner page.
```

## Phase 5 — Cleanup + proof

## I10

Task ID: I10
Title: Zero mocks + verify integration
Goal: Prove no mocks remain and the full user journey works against the backend.
Dependencies: I02, I03, I04, I05, I06, I07, I08, I09
Files to create/modify:

- `sports-store-front-end/.env.example` (add `VITE_API_URL`)
- backend `.env.example` (verify `CORS_ORIGIN` matches frontend)

Required context:

- mocks deleted in I02/I05; env wiring from I01
- proof needs both builds green

Implementation instructions:

- `grep -rn "mock" sports-store-front-end/src` must be empty
- `VITE_API_URL` in `.env.example`; backend `CORS_ORIGIN` matches frontend origin
- manual pass: list > detail > add > cart > checkout > history > profile/address/wishlist/bike/wheel > owner status change

API/data contracts:

- no contract change; verification only

Acceptance criteria:

- `npm run build` (frontend) + backend `npm test` (6/6) green; manual click-through passes

Out of scope:

- CI, uploads, payments, registration edits, multi-store

Local Model Context:

```text
Verification task only. Fix leftover mock imports or env mismatches.
Do not add features in this task.
```

---

## Recommended execution sequence

1. I00 (Phase 0 — seed first, nothing else can drop mocks before this)
2. I01 (Phase 1 — shared infra, blocks I02..I09)
3. I02, I03 (Phase 2 — catalog reads)
4. I04, I05, I06, I07, I08 (Phase 3 — UI actions)
5. I09 (Phase 4 — owner UI)
6. I10 (Phase 5 — proof)

This sequencing gives us:

- a seeded backend before any frontend switch
- one shared auth/fetch layer before per-page wiring
- read-only catalog before mutating cart/account flows
- owner UI after user auth works
- one final proof pass with zero mocks