# Sports Store Backend Architecture Plan

Date: August 16, 2026
Scope: backend architecture and implementation plan for the existing Sports Store frontend

This plan assumes:

- the frontend repository already exists at `sports-store-front-end`
- the backend repository is not initialized yet
- we want a simple modular backend using `Node.js + Express.js + MongoDB`
- MongoDB must stay compatible with the free tier
- implementation work will be done by a small-context local model, so tasks must stay narrow and isolated

---

## A. Current Project Assessment

### Existing frontend state

- The frontend is a Vite + React application.
- Routing is already partially implemented, but it is still prototype quality.
- The current UI is mostly static and local-state driven.
- There is no real frontend data layer yet.
- The UI currently leans heavily toward the user/customer flow.
- The owner/store flow is not implemented yet.

### Key frontend realities that affect backend design

- Product listing and product detail are present, but powered by hardcoded data.
- Cart, wishlist, account profile, addresses, payment methods, bike registration, and wheel registration are UI-first and not yet backed by APIs.
- Authentication UI exists but is not wired into a real auth flow.
- Route naming and resource naming are inconsistent in the current UI and should be normalized before deep integration.

### Backend implications

- We should not overbuild.
- The backend should support the user flow first, because that is where the existing UI already exists.
- The backend should still define an owner flow contract now, even if owner UI implementation lands later.
- The first backend version should prioritize stable contracts, simple validation, and clean separation of concerns over feature depth.

---

## B. Optimized UI Architecture

The current UI plan is directionally correct, but it can be simplified so backend integration stays clean.

### Recommended UI route map

- `/`
- `/products`
- `/products/:productSlug`
- `/cart`
- `/auth/login`
- `/auth/signup`
- `/account`
- `/account/profile`
- `/account/addresses`
- `/account/orders`
- `/account/payment-methods`
- `/account/wishlist`
- `/account/bikes`
- `/account/wheels`
- `/owner/login`
- `/owner/dashboard`
- `/owner/products`
- `/owner/orders`
- `/owner/inventory`
- `/owner/store-profile`

### UI simplification guidance

- Keep one shared product contract for:
  - home product cards
  - product listing
  - product detail
  - cart item snapshot
  - wishlist item snapshot
- Normalize route names before integration:
  - `myaccout` -> `account`
  - `Oders` -> `orders`
  - `SingUp` -> `SignUp`
- Create a thin frontend service layer before API integration:
  - `authService`
  - `productService`
  - `cartService`
  - `accountService`
  - `ownerService`
- Keep account UI forms aligned with backend payload shapes to avoid mapper bloat later.

### UI plan optimization summary

- Minimize refactors by preserving current screen boundaries.
- Improve naming before data integration.
- Reuse one resource contract per domain object.
- Introduce services before introducing real APIs.
- Implement user flow first, owner flow second.

---

## C. Backend Architecture

### Architecture style

Use a simple modular Express architecture:

- `routes`: HTTP route registration only
- `controllers`: request/response orchestration only
- `services`: business logic and domain rules
- `models`: MongoDB schemas and indexes
- `middlewares`: auth, validation, error handling
- `validators`: request payload validation schemas
- `config`: environment and app configuration
- `utils`: small shared helpers

This is intentionally lighter than full clean architecture. It is enough for current scale and easier for a small-context implementation model to execute safely.

### Design principles

- Keep controllers thin.
- Keep MongoDB access behind services and models.
- Avoid deep abstraction layers.
- Prefer explicit DTO mapping only where the frontend contract differs from raw schema shape.
- Use role-based auth with two roles:
  - `user`
  - `owner`
- Do not introduce queues, caching, event buses, or microservices.

### Recommended backend repository name

- `sports-store-back-end`

Reason:

- it follows the existing frontend naming style closely enough
- it keeps backend isolated from the frontend repo
- it avoids mixing server initialization into the frontend project

---

## D. Backend Repository Initialization

### Project structure

```text
sports-store-back-end/
  src/
    app.js
    server.js
    config/
      env.js
      db.js
      logger.js
    constants/
      roles.js
      order-status.js
    middlewares/
      auth.js
      error-handler.js
      not-found.js
      validate.js
    models/
      User.js
      Store.js
      Category.js
      Product.js
      Cart.js
      Order.js
      Address.js
      Wishlist.js
      BikeRegistration.js
      WheelRegistration.js
    routes/
      index.js
      auth.routes.js
      product.routes.js
      cart.routes.js
      account.routes.js
      owner.routes.js
      order.routes.js
    controllers/
      auth.controller.js
      product.controller.js
      cart.controller.js
      account.controller.js
      owner.controller.js
      order.controller.js
    services/
      auth.service.js
      product.service.js
      cart.service.js
      account.service.js
      owner.service.js
      order.service.js
    validators/
      auth.validator.js
      product.validator.js
      cart.validator.js
      account.validator.js
      owner.validator.js
      order.validator.js
    utils/
      app-error.js
      async-handler.js
      slug.js
      pagination.js
  tests/
    setup/
    integration/
    unit/
  .env.example
  .gitignore
  package.json
  README.md
```

### Package and dependency strategy

Use a minimal set:

Runtime:

- `express`
- `mongoose`
- `cors`
- `dotenv`
- `bcryptjs`
- `jsonwebtoken`
- `zod`
- `morgan`

Dev:

- `nodemon`
- `eslint`
- `vitest`
- `supertest`

Why this set:

- `mongoose` is enough for MongoDB modeling
- `zod` keeps validation simple and colocated
- `jsonwebtoken` supports simple auth without session infrastructure
- `morgan` is lightweight for request logging
- `vitest` keeps testing modern and lightweight

Avoid for now:

- `passport`
- `joi`
- `winston`
- `helmet` can be added later, but we can begin with hand-set basics if dependency minimization is preferred
- `class-validator`
- `typeorm`
- `redis`

### Environment configuration

Required environment variables:

- `NODE_ENV`
- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `CORS_ORIGIN`

Optional:

- `LOG_LEVEL`

### Express bootstrap

- `server.js`: process startup only
- `app.js`: express app assembly only
- register:
  - JSON body parsing
  - CORS
  - request logging
  - API routes
  - not found middleware
  - error middleware

### MongoDB connection

- Use a single Mongoose connection initialized during server startup.
- Fail fast if `MONGODB_URI` is missing.
- Keep one database for the free tier.
- Use conservative indexes only on fields required for lookup.

### Development scripts

- `dev`: `nodemon src/server.js`
- `start`: `node src/server.js`
- `test`: `vitest run`
- `test:watch`: `vitest`
- `lint`: `eslint .`

### Linting, formatting, testing

- Add ESLint from the start.
- Formatting can remain manual or ESLint-driven for now to avoid extra toolchain complexity.
- Add test scaffolding early, but do not try to test every route immediately.

---

## E. MongoDB Data Model

All models should stay free-tier friendly:

- avoid huge embedded arrays
- avoid excessive indexing
- avoid large denormalized snapshots unless useful for history
- keep image storage out of MongoDB documents

### 1. User

Purpose:

- stores both customer and owner identities

Core fields:

- `_id`
- `role`: `user | owner`
- `firstName`
- `lastName`
- `email`
- `passwordHash`
- `phone`
- `isActive`
- `createdAt`
- `updatedAt`

Indexes:

- unique index on `email`

### 2. Store

Purpose:

- owner-managed store profile

Core fields:

- `_id`
- `ownerId`
- `name`
- `slug`
- `description`
- `contactEmail`
- `contactPhone`
- `address`
- `isActive`
- `createdAt`
- `updatedAt`

Indexes:

- unique index on `ownerId`
- unique index on `slug`

### 3. Category

Purpose:

- basic product grouping

Core fields:

- `_id`
- `name`
- `slug`
- `isActive`

Indexes:

- unique index on `slug`

### 4. Product

Purpose:

- catalog source of truth

Core fields:

- `_id`
- `storeId`
- `categoryId`
- `title`
- `slug`
- `description`
- `shortDescription`
- `price`
- `compareAtPrice`
- `currency`
- `stockQuantity`
- `sizes`
- `images`
- `specifications`
- `status`: `draft | active | archived`
- `createdAt`
- `updatedAt`

Indexes:

- unique index on `slug`
- index on `storeId`
- index on `categoryId`
- index on `status`

### 5. Address

Purpose:

- user saved addresses

Core fields:

- `_id`
- `userId`
- `label`
- `type`: `shipping | billing`
- `fullName`
- `line1`
- `line2`
- `city`
- `state`
- `postalCode`
- `country`
- `phone`
- `isDefault`
- `createdAt`
- `updatedAt`

Indexes:

- index on `userId`

### 6. Wishlist

Purpose:

- user saved items

Core fields:

- `_id`
- `userId`
- `items`: array of `{ productId, addedAt }`
- `createdAt`
- `updatedAt`

Indexes:

- unique index on `userId`

Note:

- Keep wishlist as one document per user for simplicity.
- Cap item growth in service rules if needed later.

### 7. Cart

Purpose:

- active shopping cart per user

Core fields:

- `_id`
- `userId`
- `items`: array of
  - `productId`
  - `quantity`
  - `selectedSize`
  - `unitPriceSnapshot`
  - `titleSnapshot`
  - `imageSnapshot`
- `createdAt`
- `updatedAt`

Indexes:

- unique index on `userId`

Reason for snapshots:

- avoids extra joins for cart rendering
- keeps cart resilient if product title or image later changes

### 8. Order

Purpose:

- order history and owner order management

Core fields:

- `_id`
- `userId`
- `storeId`
- `items`
- `subtotal`
- `fees`
- `tax`
- `total`
- `currency`
- `status`
- `fulfillmentMethod`
- `shippingAddressSnapshot`
- `billingAddressSnapshot`
- `customerSnapshot`
- `createdAt`
- `updatedAt`

Indexes:

- index on `userId`
- index on `storeId`
- index on `status`
- index on `createdAt`

### 9. BikeRegistration

Purpose:

- user bike registration records

Core fields:

- `_id`
- `userId`
- `serialNumber`
- `bikeName`
- `modelYear`
- `purchaseDate`
- `purchaseLocation`
- `createdAt`
- `updatedAt`

Indexes:

- index on `userId`
- unique index on `serialNumber`

### 10. WheelRegistration

Purpose:

- user wheel registration records

Core fields:

- `_id`
- `userId`
- `serialNumber`
- `wheelName`
- `purchaseId`
- `purchaseDate`
- `purchaseLocation`
- `createdAt`
- `updatedAt`

Indexes:

- index on `userId`
- unique index on `serialNumber`

### 11. Payment method

Recommendation:

- do not store real card data in MongoDB in v1
- treat payment methods as UI-only until a payment provider is introduced

Result:

- no `PaymentMethod` collection in v1
- keep payment method endpoints out of scope for initial backend delivery

This is a deliberate simplification.

---

## F. API/Contract Design

Use `/api/v1` prefix for every route.

### Response envelope

Success:

```json
{
  "success": true,
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": []
  }
}
```

### Auth API

- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`

Signup request:

```json
{
  "firstName": "Ava",
  "lastName": "Sharma",
  "email": "ava@example.com",
  "password": "secret123",
  "role": "user"
}
```

Login request:

```json
{
  "email": "ava@example.com",
  "password": "secret123"
}
```

Auth response:

```json
{
  "success": true,
  "data": {
    "token": "jwt-token",
    "user": {
      "id": "user-id",
      "role": "user",
      "firstName": "Ava",
      "lastName": "Sharma",
      "email": "ava@example.com"
    }
  }
}
```

### Product API

- `GET /api/v1/products`
- `GET /api/v1/products/:slug`
- `GET /api/v1/categories`

Query params for products:

- `category`
- `search`
- `page`
- `limit`
- `sort`

Keep pagination simple:

- default `limit=12`
- max `limit=24`

### Cart API

- `GET /api/v1/cart`
- `POST /api/v1/cart/items`
- `PATCH /api/v1/cart/items/:productId`
- `DELETE /api/v1/cart/items/:productId`

Add item request:

```json
{
  "productId": "product-id",
  "quantity": 1,
  "selectedSize": "M"
}
```

### Wishlist API

- `GET /api/v1/account/wishlist`
- `POST /api/v1/account/wishlist/items`
- `DELETE /api/v1/account/wishlist/items/:productId`

### Account API

- `GET /api/v1/account/profile`
- `PATCH /api/v1/account/profile`
- `GET /api/v1/account/addresses`
- `POST /api/v1/account/addresses`
- `PATCH /api/v1/account/addresses/:addressId`
- `DELETE /api/v1/account/addresses/:addressId`
- `GET /api/v1/account/bikes`
- `POST /api/v1/account/bikes`
- `GET /api/v1/account/wheels`
- `POST /api/v1/account/wheels`
- `GET /api/v1/account/orders`
- `GET /api/v1/account/orders/:orderId`

### Order API

- `POST /api/v1/orders`

Create order request:

```json
{
  "fulfillmentMethod": "pickup",
  "shippingAddressId": "address-id",
  "billingAddressId": "address-id"
}
```

### Owner API

- `GET /api/v1/owner/store`
- `PATCH /api/v1/owner/store`
- `GET /api/v1/owner/products`
- `POST /api/v1/owner/products`
- `PATCH /api/v1/owner/products/:productId`
- `GET /api/v1/owner/orders`
- `PATCH /api/v1/owner/orders/:orderId/status`
- `GET /api/v1/owner/dashboard`

### Owner status update request

```json
{
  "status": "confirmed"
}
```

---

## G. Frontend ↔ Backend Integration

### Integration principles

- Frontend should call backend through small service modules.
- Frontend should not talk directly to route strings across many components.
- One service module per backend domain is enough.

### Recommended frontend service layer

- `src/services/authService.js`
- `src/services/productService.js`
- `src/services/cartService.js`
- `src/services/accountService.js`
- `src/services/ownerService.js`

### Shared contract recommendations

Keep one normalized frontend product shape:

```json
{
  "id": "product-id",
  "title": "Sirrus X 5.0",
  "slug": "sirrus-x-5-0",
  "price": 2250,
  "compareAtPrice": 2500,
  "currency": "USD",
  "primaryImage": "/image-url",
  "stockQuantity": 5,
  "sizes": ["XS", "S", "M", "L"]
}
```

Keep one normalized cart item shape:

```json
{
  "productId": "product-id",
  "title": "Sirrus X 5.0",
  "image": "/image-url",
  "unitPrice": 2250,
  "quantity": 1,
  "selectedSize": "M"
}
```

Keep one normalized profile shape:

```json
{
  "id": "user-id",
  "firstName": "Ava",
  "lastName": "Sharma",
  "email": "ava@example.com",
  "phone": "+91-9999999999"
}
```

### Integration sequencing

1. Auth
2. Product list
3. Product detail
4. Cart
5. Wishlist
6. Profile
7. Addresses
8. Orders
9. Bike registration
10. Wheel registration
11. Owner store/product/order APIs

---

## H. Security & Error Handling

### Security basics

Keep security practical, not heavy.

- Hash passwords with `bcryptjs`
- Use JWT auth with bearer token
- Never return password hash
- Validate all request payloads
- Restrict owner routes by role
- Restrict account routes to authenticated users
- Limit CORS to configured frontend origin
- Do not store payment card data
- Avoid verbose internal error leakage in production

### Authorization rules

- `user`:
  - own cart
  - own wishlist
  - own profile
  - own addresses
  - own registrations
  - own orders
- `owner`:
  - own store
  - own products
  - own inventory
  - own store orders

### Error handling design

Use a central error handler with:

- application errors
- validation errors
- auth errors
- not found errors
- database conflict errors

Suggested app error codes:

- `VALIDATION_ERROR`
- `UNAUTHORIZED`
- `FORBIDDEN`
- `NOT_FOUND`
- `CONFLICT`
- `INTERNAL_SERVER_ERROR`

---

## I. Testing Strategy

### Testing scope

Keep tests focused on the highest-value backend behavior.

Unit tests:

- validators
- small service helpers
- auth service behavior

Integration tests:

- auth signup/login
- product listing
- cart add/update/remove
- address create/update/delete
- order creation
- owner product create/update

### Practical testing guidance

- Do not try to test every controller branch at first.
- Prefer integration tests for route + controller + service stacks.
- Use a separate test database connection string.
- Seed only minimal records required by each test.

### Test phases

- Phase 1: auth + products
- Phase 2: cart + addresses
- Phase 3: orders + owner routes

---

## J. Deployment Strategy

### MongoDB

- Use MongoDB Atlas free tier
- One cluster
- One database
- Keep indexes conservative
- Keep document size small

### App hosting

Simple options:

- Render
- Railway
- Fly.io

Preferred initial approach:

- backend on Render or Railway
- MongoDB Atlas free tier

### Deployment requirements

- environment variables configured in host
- CORS origin set to deployed frontend URL
- health check route:
  - `GET /api/v1/health`

### Free-tier compatibility safeguards

- avoid background jobs
- avoid high-write analytics tables
- avoid image/blob storage in MongoDB
- avoid aggressive indexing
- keep pagination defaults low

---

## K. Task Dependency Graph

```text
T01 -> T02 -> T03 -> T04 -> T05
T03 -> T06
T03 -> T07
T03 -> T08
T03 -> T09
T03 -> T10
T03 -> T11
T04 -> T06
T04 -> T07
T04 -> T08
T04 -> T09
T04 -> T10
T04 -> T11
T05 -> T06
T05 -> T07
T05 -> T08
T05 -> T09
T05 -> T10
T05 -> T11
T06 -> T12
T07 -> T13
T08 -> T14
T09 -> T14
T10 -> T15
T11 -> T15
T12 -> T16
T13 -> T16
T14 -> T17
T15 -> T17
T16 -> T18
T17 -> T18
T18 -> T19
T19 -> T20
```

Interpretation:

- T01 to T05 establish foundation
- T06 to T11 add domain building blocks
- T12 to T18 add feature routes incrementally
- T19 and T20 prepare production readiness and documentation

---

## L. Implementation Tasks

## T01

Task ID: T01  
Title: Initialize backend repository  
Goal: Create the backend repository with baseline package metadata, ignore rules, and README.  
Dependencies: None  
Files to create/modify:

- `sports-store-back-end/package.json`
- `sports-store-back-end/.gitignore`
- `sports-store-back-end/README.md`

Required context:

- Frontend repository exists at `sports-store-front-end`
- Backend repository does not exist yet
- Use Node.js with ESM modules to match frontend style

Implementation instructions:

- Create `sports-store-back-end`
- Initialize a Node.js project with `"type": "module"`
- Add scripts for `dev`, `start`, `lint`, `test`
- Add a README with setup placeholders only
- Ignore `node_modules`, `.env`, coverage, logs

API/data contracts: None  
Acceptance criteria:

- Backend repo folder exists
- `package.json` uses ESM
- scripts are present
- `.gitignore` covers secrets and runtime artifacts

Out of scope:

- Express app files
- dependencies installation details
- MongoDB connection

Local Model Context:

```text
You are working in /Users/gajendra/Repos/sports_store.
Create a new backend repo folder named sports-store-back-end.
This task only initializes the repo metadata files:
- package.json
- .gitignore
- README.md
Use ESM ("type": "module").
Add scripts: dev, start, lint, test.
Do not add application code yet.
Do not touch the frontend repo.
```

## T02

Task ID: T02  
Title: Add backend dependency baseline  
Goal: Add the minimal runtime and dev dependency set needed for the backend foundation.  
Dependencies: T01  
Files to create/modify:

- `sports-store-back-end/package.json`

Required context:

- Existing `package.json` from T01
- Use only these libraries:
  - express
  - mongoose
  - cors
  - dotenv
  - bcryptjs
  - jsonwebtoken
  - zod
  - morgan
  - nodemon
  - eslint
  - vitest
  - supertest

Implementation instructions:

- Update `package.json` dependencies and devDependencies
- Keep scripts intact from T01
- Do not create source files yet

API/data contracts: None  
Acceptance criteria:

- `package.json` declares the approved dependency set
- no extra libraries are introduced

Out of scope:

- npm install lockfile concerns
- app bootstrap files

Local Model Context:

```text
Backend repo already exists at sports-store-back-end.
Update only package.json.
Add the approved dependency list and keep the project ESM.
Do not create source code files in this task.
Do not add any libraries beyond the approved set.
```

## T03

Task ID: T03  
Title: Create backend folder skeleton  
Goal: Create the source and test directory structure for the modular Express app.  
Dependencies: T01  
Files to create/modify:

- `sports-store-back-end/src/` directory tree
- `sports-store-back-end/tests/` directory tree

Required context:

- Use the folder structure defined in section D
- Do not implement business logic yet

Implementation instructions:

- Create empty directories only
- Add `.gitkeep` files only if needed to preserve structure

API/data contracts: None  
Acceptance criteria:

- `src` subfolders exist for config, constants, middlewares, models, routes, controllers, services, validators, utils
- `tests` subfolders exist for setup, unit, integration

Out of scope:

- any executable app code

Local Model Context:

```text
Create the backend directory skeleton only.
No application logic yet.
Target repo: sports-store-back-end.
Create src and tests subfolders for a modular Express app.
Keep this task limited to directory creation.
```

## T04

Task ID: T04  
Title: Add environment and config foundation  
Goal: Create environment loading and configuration helpers.  
Dependencies: T02, T03  
Files to create/modify:

- `sports-store-back-end/.env.example`
- `sports-store-back-end/src/config/env.js`

Required context:

- Required env vars:
  - NODE_ENV
  - PORT
  - MONGODB_URI
  - JWT_SECRET
  - JWT_EXPIRES_IN
  - CORS_ORIGIN

Implementation instructions:

- Add `.env.example` with placeholder values
- Add `env.js` that loads and validates required env usage simply
- Fail fast on missing required values

API/data contracts: None  
Acceptance criteria:

- `.env.example` documents required variables
- config module exports normalized env config

Out of scope:

- MongoDB connection
- logger config

Local Model Context:

```text
Backend repo is initialized.
Create only environment foundation files:
- .env.example
- src/config/env.js
Support required env vars: NODE_ENV, PORT, MONGODB_URI, JWT_SECRET, JWT_EXPIRES_IN, CORS_ORIGIN.
Keep validation simple and fail fast.
Do not create Express bootstrap code yet.
```

## T05

Task ID: T05  
Title: Add Express bootstrap and Mongo connection  
Goal: Create the base server startup, app assembly, health route, and MongoDB connection module.  
Dependencies: T02, T03, T04  
Files to create/modify:

- `sports-store-back-end/src/app.js`
- `sports-store-back-end/src/server.js`
- `sports-store-back-end/src/config/db.js`
- `sports-store-back-end/src/routes/index.js`

Required context:

- Use ESM
- Use express, cors, morgan, mongoose
- Add `GET /api/v1/health`

Implementation instructions:

- `app.js` builds the Express app
- `server.js` starts the server and connects to Mongo
- `db.js` exports a connect function using Mongoose
- `routes/index.js` registers the health route and leaves room for feature routes

API/data contracts:

- `GET /api/v1/health` returns success and simple status payload

Acceptance criteria:

- server starts cleanly
- database connection is initialized from config
- health route is reachable

Out of scope:

- auth
- models
- feature routes

Local Model Context:

```text
Create the minimal backend runtime foundation.
Files:
- src/app.js
- src/server.js
- src/config/db.js
- src/routes/index.js
Use express, cors, morgan, mongoose.
Add GET /api/v1/health under /api/v1.
No feature routes yet.
```

## T06

Task ID: T06  
Title: Add error utility and global error middleware  
Goal: Standardize backend error flow before feature work begins.  
Dependencies: T03, T05  
Files to create/modify:

- `sports-store-back-end/src/utils/app-error.js`
- `sports-store-back-end/src/utils/async-handler.js`
- `sports-store-back-end/src/middlewares/not-found.js`
- `sports-store-back-end/src/middlewares/error-handler.js`
- `sports-store-back-end/src/app.js`

Required context:

- Use central error shape from section F
- support codes like VALIDATION_ERROR and NOT_FOUND

Implementation instructions:

- Add an app error class
- Add async wrapper helper
- Add not found middleware
- Add final error handler middleware
- register both in `app.js`

API/data contracts:

- error responses use the shared error envelope

Acceptance criteria:

- unknown routes return not-found envelope
- thrown app errors are converted to consistent JSON responses

Out of scope:

- validation middleware
- auth middleware

Local Model Context:

```text
The Express app foundation already exists.
Add standardized error handling with:
- app-error utility
- async-handler utility
- not-found middleware
- error-handler middleware
Update app.js to use them.
Keep the response format consistent with:
{ success: false, error: { code, message, details? } }
```

## T07

Task ID: T07  
Title: Add auth model and role constants  
Goal: Create the foundational user model and role constants.  
Dependencies: T03, T05  
Files to create/modify:

- `sports-store-back-end/src/constants/roles.js`
- `sports-store-back-end/src/models/User.js`

Required context:

- roles are `user` and `owner`
- user schema fields:
  - firstName
  - lastName
  - email
  - passwordHash
  - phone
  - role
  - isActive

Implementation instructions:

- Add role constants
- Add Mongoose user schema with timestamps
- Add unique index on email

API/data contracts: None  
Acceptance criteria:

- user model exports cleanly
- role constants are reusable across middleware and services

Out of scope:

- auth services
- password hashing hooks

Local Model Context:

```text
Create the user model foundation only.
Files:
- src/constants/roles.js
- src/models/User.js
Use Mongoose.
Roles: user, owner.
Add a unique email index and timestamps.
Do not add route or service code yet.
```

## T08

Task ID: T08  
Title: Add product catalog models  
Goal: Create category, store, and product schemas for the catalog domain.  
Dependencies: T03, T05  
Files to create/modify:

- `sports-store-back-end/src/models/Category.js`
- `sports-store-back-end/src/models/Store.js`
- `sports-store-back-end/src/models/Product.js`

Required context:

- Use fields from section E
- product statuses: `draft`, `active`, `archived`
- use timestamps

Implementation instructions:

- Add category schema with unique slug
- Add store schema with ownerId and slug
- Add product schema with storeId, categoryId, slug, price, stock, sizes, images, specifications, status

API/data contracts: None  
Acceptance criteria:

- all three models export cleanly
- core indexes are present

Out of scope:

- product routes
- owner authorization

Local Model Context:

```text
Create the catalog models only:
- Category
- Store
- Product
Use Mongoose and timestamps.
Keep schemas simple and aligned with the backend plan.
Do not create controllers or routes in this task.
```

## T09

Task ID: T09  
Title: Add cart and wishlist models  
Goal: Create the user shopping state schemas.  
Dependencies: T03, T05  
Files to create/modify:

- `sports-store-back-end/src/models/Cart.js`
- `sports-store-back-end/src/models/Wishlist.js`

Required context:

- one cart per user
- one wishlist per user
- cart items contain price and title snapshots

Implementation instructions:

- Add cart schema with unique userId
- Add wishlist schema with unique userId
- keep embedded item shape simple

API/data contracts: None  
Acceptance criteria:

- schemas export cleanly
- unique indexes on userId exist

Out of scope:

- cart services
- wishlist routes

Local Model Context:

```text
Create the shopping state models only:
- Cart
- Wishlist
Each user should have one document.
Cart items should include basic snapshots like title and unitPrice.
No services or routes yet.
```

## T10

Task ID: T10  
Title: Add account domain models  
Goal: Create address, bike registration, and wheel registration schemas.  
Dependencies: T03, T05  
Files to create/modify:

- `sports-store-back-end/src/models/Address.js`
- `sports-store-back-end/src/models/BikeRegistration.js`
- `sports-store-back-end/src/models/WheelRegistration.js`

Required context:

- use user-owned documents
- serial numbers should be unique for bike and wheel registrations

Implementation instructions:

- Add address schema with type, fullName, line1, city, state, postalCode, country, phone, isDefault
- Add bike registration schema
- Add wheel registration schema

API/data contracts: None  
Acceptance criteria:

- account models export cleanly
- user lookup indexes exist
- serial uniqueness indexes exist where required

Out of scope:

- address routes
- registration services

Local Model Context:

```text
Create the account-related models only:
- Address
- BikeRegistration
- WheelRegistration
Use Mongoose with timestamps.
Bike and wheel serialNumber fields should be unique.
No route logic in this task.
```

## T11

Task ID: T11  
Title: Add order model and order status constants  
Goal: Create the order persistence foundation for user history and owner management.  
Dependencies: T03, T05  
Files to create/modify:

- `sports-store-back-end/src/constants/order-status.js`
- `sports-store-back-end/src/models/Order.js`

Required context:

- order statuses should be simple, such as:
  - pending
  - confirmed
  - ready_for_pickup
  - completed
  - cancelled

Implementation instructions:

- Add order status constants
- Add order schema with totals, address snapshots, customer snapshot, items, status, storeId, userId

API/data contracts: None  
Acceptance criteria:

- order model exports cleanly
- required indexes exist

Out of scope:

- order creation logic
- owner order routes

Local Model Context:

```text
Create the order foundation only.
Files:
- src/constants/order-status.js
- src/models/Order.js
Use a simple order status enum and an order schema with snapshots for customer and address data.
No service or controller code yet.
```

## T12

Task ID: T12  
Title: Implement auth validation and middleware foundation  
Goal: Add request validation middleware and JWT auth middleware.  
Dependencies: T04, T06, T07  
Files to create/modify:

- `sports-store-back-end/src/middlewares/validate.js`
- `sports-store-back-end/src/middlewares/auth.js`
- `sports-store-back-end/src/validators/auth.validator.js`

Required context:

- use Zod
- bearer token auth
- support optional role restriction helper

Implementation instructions:

- Add generic validation middleware
- Add JWT auth middleware that loads current user identity from token
- Add role guard helper
- Add signup/login validator schemas

API/data contracts:

- signup and login payloads use section F contracts

Acceptance criteria:

- auth middleware rejects missing/invalid token
- role guard supports `user` and `owner`
- validators are reusable by routes

Out of scope:

- auth controller
- auth routes

Local Model Context:

```text
The backend foundation and User model already exist.
Create:
- validate middleware using Zod
- auth middleware using JWT bearer tokens
- auth validator schemas for signup/login
Keep this task focused on middleware and validators only.
Do not implement controllers or routes yet.
```

## T13

Task ID: T13  
Title: Implement auth service and auth routes  
Goal: Deliver signup, login, and current-user APIs.  
Dependencies: T06, T07, T12  
Files to create/modify:

- `sports-store-back-end/src/services/auth.service.js`
- `sports-store-back-end/src/controllers/auth.controller.js`
- `sports-store-back-end/src/routes/auth.routes.js`
- `sports-store-back-end/src/routes/index.js`

Required context:

- use `User` model
- hash with `bcryptjs`
- sign JWT with env config
- expose:
  - POST `/api/v1/auth/signup`
  - POST `/api/v1/auth/login`
  - GET `/api/v1/auth/me`

Implementation instructions:

- create user signup flow
- validate email uniqueness
- hash password
- create login flow
- create me endpoint using auth middleware
- register auth routes in root router

API/data contracts:

- use auth request/response shapes from section F

Acceptance criteria:

- signup works for new email
- login returns token and safe user payload
- me returns authenticated user

Out of scope:

- password reset
- refresh tokens

Local Model Context:

```text
Implement auth feature only.
Existing foundation:
- User model
- auth middleware
- auth validators
- error middleware
Create:
- auth service
- auth controller
- auth routes
- route registration
Expose signup, login, and me endpoints only.
```

## T14

Task ID: T14  
Title: Implement catalog read APIs  
Goal: Deliver product and category read endpoints for frontend browsing.  
Dependencies: T06, T08  
Files to create/modify:

- `sports-store-back-end/src/services/product.service.js`
- `sports-store-back-end/src/controllers/product.controller.js`
- `sports-store-back-end/src/routes/product.routes.js`
- `sports-store-back-end/src/routes/index.js`
- `sports-store-back-end/src/validators/product.validator.js`

Required context:

- use models: Product, Category
- expose:
  - GET `/api/v1/products`
  - GET `/api/v1/products/:slug`
  - GET `/api/v1/categories`
- simple pagination and filtering only

Implementation instructions:

- implement product list query with page, limit, category, search, sort
- limit default 12, max 24
- return active products only
- add get-by-slug endpoint
- add category listing endpoint

API/data contracts:

- product payload aligns with section G normalized shape where possible

Acceptance criteria:

- product list endpoint supports basic filters
- get-by-slug endpoint returns one product
- categories endpoint returns active categories

Out of scope:

- owner product mutation
- advanced search

Local Model Context:

```text
Implement catalog read APIs only.
Existing models:
- Product
- Category
Create:
- product service
- product controller
- product routes
- product validators
Expose GET /api/v1/products, GET /api/v1/products/:slug, GET /api/v1/categories.
Keep filtering and pagination simple.
```

## T15

Task ID: T15  
Title: Implement cart APIs  
Goal: Deliver authenticated cart read and mutation APIs.  
Dependencies: T06, T09, T12, T14  
Files to create/modify:

- `sports-store-back-end/src/services/cart.service.js`
- `sports-store-back-end/src/controllers/cart.controller.js`
- `sports-store-back-end/src/routes/cart.routes.js`
- `sports-store-back-end/src/routes/index.js`
- `sports-store-back-end/src/validators/cart.validator.js`

Required context:

- use models: Cart, Product
- authenticated user only
- expose:
  - GET `/api/v1/cart`
  - POST `/api/v1/cart/items`
  - PATCH `/api/v1/cart/items/:productId`
  - DELETE `/api/v1/cart/items/:productId`

Implementation instructions:

- create cart on first use if needed
- validate product exists and is active
- enforce quantity >= 1
- store simple product snapshots in cart items

API/data contracts:

- add item payload from section F

Acceptance criteria:

- cart read works for authenticated user
- add/update/delete cart item endpoints work
- product snapshots are stored in cart items

Out of scope:

- guest cart
- coupon logic

Local Model Context:

```text
Implement cart APIs only.
Existing foundation:
- Cart model
- Product model
- auth middleware
- error handling
Create cart service, controller, routes, and validators.
Expose GET cart, add item, update quantity, delete item.
Use authenticated user identity from JWT.
```

## T16

Task ID: T16  
Title: Implement account profile and address APIs  
Goal: Deliver profile and address management endpoints.  
Dependencies: T06, T10, T12, T13  
Files to create/modify:

- `sports-store-back-end/src/services/account.service.js`
- `sports-store-back-end/src/controllers/account.controller.js`
- `sports-store-back-end/src/routes/account.routes.js`
- `sports-store-back-end/src/routes/index.js`
- `sports-store-back-end/src/validators/account.validator.js`

Required context:

- use models: User, Address
- expose:
  - GET `/api/v1/account/profile`
  - PATCH `/api/v1/account/profile`
  - GET `/api/v1/account/addresses`
  - POST `/api/v1/account/addresses`
  - PATCH `/api/v1/account/addresses/:addressId`
  - DELETE `/api/v1/account/addresses/:addressId`

Implementation instructions:

- implement authenticated profile read/update
- implement address CRUD scoped to authenticated user
- keep address payload simple and aligned with UI forms

API/data contracts:

- response shapes should be direct and frontend-friendly

Acceptance criteria:

- profile read/update works
- address list/create/update/delete works for the current user only

Out of scope:

- payment methods
- nested region validation

Local Model Context:

```text
Implement account profile and address APIs only.
Existing models:
- User
- Address
Existing middleware:
- auth
- validate
- error handling
Create account service, controller, routes, and validators.
Support profile read/update and address CRUD.
```

## T17

Task ID: T17  
Title: Implement wishlist and registration APIs  
Goal: Deliver wishlist, bike registration, and wheel registration endpoints.  
Dependencies: T06, T09, T10, T12, T13, T14  
Files to create/modify:

- `sports-store-back-end/src/services/account.service.js`
- `sports-store-back-end/src/controllers/account.controller.js`
- `sports-store-back-end/src/routes/account.routes.js`
- `sports-store-back-end/src/validators/account.validator.js`

Required context:

- extend existing account domain files from T16
- add:
  - GET `/api/v1/account/wishlist`
  - POST `/api/v1/account/wishlist/items`
  - DELETE `/api/v1/account/wishlist/items/:productId`
  - GET `/api/v1/account/bikes`
  - POST `/api/v1/account/bikes`
  - GET `/api/v1/account/wheels`
  - POST `/api/v1/account/wheels`

Implementation instructions:

- keep work limited to extending existing account module files
- validate products for wishlist additions
- validate serial-based registration payloads

API/data contracts:

- wishlist returns normalized saved product items

Acceptance criteria:

- wishlist read/add/remove works
- bike registration read/create works
- wheel registration read/create works

Out of scope:

- registration edits
- bulk registration imports

Local Model Context:

```text
Extend the existing account module only.
Do not create a new separate domain.
Add wishlist, bike registration, and wheel registration APIs to:
- account service
- account controller
- account routes
- account validators
Use existing models for Wishlist, BikeRegistration, WheelRegistration, and Product.
```

## T18

Task ID: T18  
Title: Implement order creation and account order history  
Goal: Deliver checkout order creation and user order history endpoints.  
Dependencies: T06, T10, T11, T12, T15, T16  
Files to create/modify:

- `sports-store-back-end/src/services/order.service.js`
- `sports-store-back-end/src/controllers/order.controller.js`
- `sports-store-back-end/src/routes/order.routes.js`
- `sports-store-back-end/src/routes/account.routes.js`
- `sports-store-back-end/src/routes/index.js`
- `sports-store-back-end/src/validators/order.validator.js`

Required context:

- use models: Cart, Order, Address
- expose:
  - POST `/api/v1/orders`
  - GET `/api/v1/account/orders`
  - GET `/api/v1/account/orders/:orderId`

Implementation instructions:

- create order from current user cart
- snapshot customer, address, and cart item data into the order
- keep fulfillment simple, defaulting to pickup if desired
- clear cart after successful order creation
- account order history should be user-scoped

API/data contracts:

- create order request from section F

Acceptance criteria:

- order can be created from existing cart
- order list and detail work for authenticated user
- cart is cleared after successful order creation

Out of scope:

- online payment integration
- refunds

Local Model Context:

```text
Implement order creation and user order history only.
Existing foundation:
- Cart model
- Order model
- Address model
- auth middleware
Create order service, controller, routes, and validators.
Also extend account routes for order history endpoints.
Use order snapshots and clear the cart after successful order creation.
```

## T19

Task ID: T19  
Title: Implement owner store and product management APIs  
Goal: Deliver the first owner-facing management endpoints.  
Dependencies: T06, T08, T12, T13  
Files to create/modify:

- `sports-store-back-end/src/services/owner.service.js`
- `sports-store-back-end/src/controllers/owner.controller.js`
- `sports-store-back-end/src/routes/owner.routes.js`
- `sports-store-back-end/src/routes/index.js`
- `sports-store-back-end/src/validators/owner.validator.js`

Required context:

- use models: Store, Product
- owner-only access
- expose:
  - GET `/api/v1/owner/store`
  - PATCH `/api/v1/owner/store`
  - GET `/api/v1/owner/products`
  - POST `/api/v1/owner/products`
  - PATCH `/api/v1/owner/products/:productId`
  - GET `/api/v1/owner/dashboard`

Implementation instructions:

- scope store access to authenticated owner
- scope product access to authenticated owner store
- keep dashboard simple, with counts only

API/data contracts:

- owner product create/update payloads should align with product schema essentials only

Acceptance criteria:

- owner can read/update own store
- owner can list/create/update own products
- dashboard returns simple counts

Out of scope:

- product delete
- image uploads
- multi-store ownership

Local Model Context:

```text
Implement owner store and product management only.
Existing models:
- Store
- Product
- User
Existing middleware:
- auth
- role guard
Create owner service, controller, routes, and validators.
Protect all endpoints for owner role only.
```

## T20

Task ID: T20  
Title: Implement owner order management, tests, and backend documentation  
Goal: Finish the first production-ready backend slice with owner order APIs, baseline tests, and setup documentation.  
Dependencies: T13, T14, T15, T16, T18, T19  
Files to create/modify:

- `sports-store-back-end/src/services/owner.service.js`
- `sports-store-back-end/src/controllers/owner.controller.js`
- `sports-store-back-end/src/routes/owner.routes.js`
- `sports-store-back-end/tests/integration/` test files
- `sports-store-back-end/README.md`

Required context:

- extend owner module from T19
- add:
  - GET `/api/v1/owner/orders`
  - PATCH `/api/v1/owner/orders/:orderId/status`
- add a minimal but useful integration test baseline

Implementation instructions:

- implement owner order listing scoped to owner store
- implement owner order status update
- add tests for:
  - auth login/signup
  - product listing
  - cart mutation
  - order creation
  - owner order status update
- update README with setup, env vars, scripts, and architecture summary

API/data contracts:

- owner order status update request uses the contract from section F

Acceptance criteria:

- owner can list and update store orders
- baseline integration tests exist and run
- README explains setup and architecture clearly

Out of scope:

- CI pipeline
- deployment automation
- advanced observability

Local Model Context:

```text
Extend the owner module and finish backend readiness.
Add owner order endpoints to existing owner files.
Add a small integration test baseline and update README.
Keep tests focused on high-value flows only:
- auth
- products
- cart
- order creation
- owner order status update
Do not add CI or deployment scripts in this task.
```

---

## Recommended execution sequence

1. T01
2. T02
3. T03
4. T04
5. T05
6. T06
7. T07, T08, T09, T10, T11
8. T12
9. T13
10. T14
11. T15
12. T16
13. T17
14. T18
15. T19
16. T20

This sequencing gives us:

- a stable initialization phase
- a fully testable backend skeleton before feature work
- user-facing functionality before owner-facing functionality
- small implementation slices that fit a 4K–8K local-model context
