# Sports Store UI Architecture and Fix Plan

Date: August 16, 2026
Scope: frontend cleanup and integration readiness plan for the existing Sports Store frontend

This plan is based on the current repository state in `sports-store-front-end`.

It is designed for a small-context local model, so each task is:

- one logical change
- small enough to fit in a 4K–8K context window
- limited to a few related files
- independently executable

We should complete these tasks before or alongside backend integration, so the frontend becomes predictable, reusable, and easier to connect to the backend plan.

---

## A. Current UI Assessment

### Current frontend state

- The app is a React + Vite frontend with React Router.
- The route structure is still prototype quality.
- Several screens are already present, but many are static or local-state only.
- The user account flow exists visually.
- The store owner flow does not exist yet.
- Naming is inconsistent across routes, files, and UI copy.

### Key issues found in the current repo

- `/` renders `Single_Product_page` instead of `HomePage`
- route names are inconsistent:
  - `myaccout`
  - `Oders`
  - `Wishlist`
  - `PaymentMethods`
  - `Wheels`
- auth pages exist but are not routed
- navbar contains broken and placeholder links
- cart exists as a component but is not correctly wired into the app flow
- product list and cart are hardcoded instead of data-driven
- several components include dead code and debug logging
- some forms collect incorrect or incomplete data
- there is no owner flow

### UI goals

- normalize routes and screen naming
- reduce accidental complexity
- preserve the existing screen boundaries where possible
- prepare the frontend for clean backend integration
- avoid large refactors

---

## B. Optimized UI Architecture

### Recommended route map

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

### Recommended UI structure direction

Keep the current app mostly intact, but gradually move toward:

- `pages` for route-level screens
- `components` for reusable UI blocks
- `services` for API-facing frontend logic
- `data` or `mocks` for temporary frontend-only mock datasets

### Resource contracts we should preserve

Use one normalized frontend contract per domain:

- product
- cart item
- wishlist item
- user profile
- address
- bike registration
- wheel registration

### UI simplification rules

- do not rename files and routes in the same task unless that task is specifically about naming cleanup
- prefer route cleanup before data integration
- prefer mock-data extraction before API integration
- avoid redesigning presentational components unless required for correct behavior

---

## C. Task Dependency Graph

```text
U01 -> U02 -> U03 -> U04
U02 -> U05
U02 -> U06
U03 -> U07
U03 -> U08
U03 -> U09
U05 -> U10
U06 -> U10
U07 -> U11
U08 -> U11
U09 -> U12
U10 -> U13
U11 -> U13
U12 -> U14
U13 -> U15
U14 -> U15
U15 -> U16
U16 -> U17
U17 -> U18
```

Interpretation:

- U01 to U04 normalize routing and app shell behavior
- U05 to U10 fix navigation and auth entry points
- U07 to U15 make product and cart flows integration-ready
- U16 to U18 finish account cleanup and define owner UI foundation

---

## D. Implementation Tasks

## U01

Task ID: U01  
Title: Fix root landing route and basic page map  
Goal: Make the app land on the homepage and introduce the correct top-level page routes.  
Dependencies: None  
Files to create/modify:

- `sports-store-front-end/src/App.jsx`

Required context:

- Current `/` route renders `Single_Product_page`
- `HomePage`, `Product_List_Page`, and `ProductCart` already exist
- Auth pages are not part of this task yet

Implementation instructions:

- Change the index route to render `HomePage`
- Add a route for products listing using `/products`
- Add a route for a product detail page using `/products/:productSlug`
- Add a route for `/cart`
- Do not fix account routes in this task

API/data contracts:

- product detail route should accept a `productSlug` path param for later backend integration

Acceptance criteria:

- `/` renders `HomePage`
- `/products` renders the product list page
- `/products/:productSlug` renders the single product page
- `/cart` renders the cart page

Out of scope:

- account route cleanup
- auth routes
- navbar link updates

Local Model Context:

```text
You are working in sports-store-front-end.
Update only src/App.jsx.
Current problem: the app index route renders Single_Product_page instead of HomePage.
This task should:
- make / render HomePage
- add /products
- add /products/:productSlug
- add /cart
Do not work on account routes or auth routes yet.
```

## U02

Task ID: U02  
Title: Normalize account route naming  
Goal: Replace the misspelled and inconsistent account route structure with a clean `/account/*` hierarchy.  
Dependencies: U01  
Files to create/modify:

- `sports-store-front-end/src/App.jsx`

Required context:

- Current route root is `myaccout`
- Current child names are mixed-case and inconsistent

Implementation instructions:

- Rename the account parent route to `/account`
- Normalize child routes to:
  - `profile`
  - `addresses`
  - `orders`
  - `payment-methods`
  - `wishlist`
  - `bikes`
  - `wheels`
- Keep the same components for now

API/data contracts:

- account route names should match backend route naming conventions

Acceptance criteria:

- account routes are lowercase and predictable
- route names align with future backend integration

Out of scope:

- navbar links
- account component internal links
- owner routes

Local Model Context:

```text
Update only src/App.jsx.
Normalize the account route structure.
Current route names are inconsistent and include myaccout, Oders, PaymentMethods, Wishlist, Wheels.
Change the route hierarchy to:
- /account
- /account/profile
- /account/addresses
- /account/orders
- /account/payment-methods
- /account/wishlist
- /account/bikes
- /account/wheels
Keep using the existing account components for now.
```

## U03

Task ID: U03  
Title: Fix invalid nested account default route  
Goal: Make the account route render predictably by separating default child behavior from explicit profile routing.  
Dependencies: U02  
Files to create/modify:

- `sports-store-front-end/src/App.jsx`

Required context:

- Current profile route incorrectly uses both `index: true` and `path`

Implementation instructions:

- Choose one clear pattern:
  - either `/account` redirects or renders profile
  - or `/account` has an index child and `/account/profile` is separate
- Keep the routing explicit and easy to maintain

API/data contracts: None  
Acceptance criteria:

- account default rendering is valid React Router configuration
- `/account/profile` remains reachable

Out of scope:

- account UI layout refactor
- mobile account behavior

Local Model Context:

```text
Update only src/App.jsx.
The current account/profile route mixes index: true with a path, which is invalid route configuration.
Refactor the nested account route so:
- the default account child behavior is valid
- /account/profile is still reachable
Do not touch other components in this task.
```

## U04

Task ID: U04  
Title: Add auth routes for login and signup screens  
Goal: Make auth pages reachable through real routes.  
Dependencies: U01  
Files to create/modify:

- `sports-store-front-end/src/App.jsx`

Required context:

- `Login.jsx` already exists
- `SingUp.jsx` exists and will be renamed later

Implementation instructions:

- Add `/auth/login`
- Add `/auth/signup`
- Use current auth components without renaming them yet

API/data contracts:

- these routes will later connect to backend auth endpoints:
  - `POST /api/v1/auth/login`
  - `POST /api/v1/auth/signup`

Acceptance criteria:

- both auth pages are directly routable

Out of scope:

- navbar updates
- signup component rename
- auth form behavior

Local Model Context:

```text
Update only src/App.jsx.
Add auth routes:
- /auth/login
- /auth/signup
Use the existing Login and SingUp components as-is for now.
Do not rename files in this task.
```

## U05

Task ID: U05  
Title: Fix top navbar primary links  
Goal: Make the desktop navbar point to real routes instead of broken placeholders.  
Dependencies: U01, U02, U04  
Files to create/modify:

- `sports-store-front-end/src/assets/components/NavBar.jsx`

Required context:

- Current links include:
  - `myaccout/Wishlist`
  - `/ag`
  - `myaccout`

Implementation instructions:

- Update navbar links to:
  - `Home` -> `/`
  - `Saved` -> `/account/wishlist`
  - `Cart` -> `/cart`
  - `Login` -> `/auth/login`
- Do not refactor the drawer or button behavior yet

API/data contracts: None  
Acceptance criteria:

- main navbar links use valid routes only

Out of scope:

- mobile drawer button behavior
- dead code cleanup

Local Model Context:

```text
Update only src/assets/components/NavBar.jsx.
Fix the top navbar links so they point to real routes:
- Home -> /
- Saved -> /account/wishlist
- Cart -> /cart
- Login -> /auth/login
Do not refactor the drawer buttons or remove dead code yet.
```

## U06

Task ID: U06  
Title: Fix mobile drawer navigation links and buttons  
Goal: Make the mobile drawer usable for navigation and auth entry.  
Dependencies: U01, U02, U04  
Files to create/modify:

- `sports-store-front-end/src/assets/components/NavBar.jsx`

Required context:

- Current drawer auth buttons do not navigate
- Current drawer account and saved links still use old paths

Implementation instructions:

- Update drawer links to the normalized route map
- Make `Log In` navigate to `/auth/login`
- Make `Sign Up` navigate to `/auth/signup`
- Update `My Account` to `/account`
- Update `Saved for Later` to `/account/wishlist`

API/data contracts: None  
Acceptance criteria:

- mobile drawer links navigate to valid routes
- auth buttons are clickable and route correctly

Out of scope:

- broader navbar cleanup
- component extraction

Local Model Context:

```text
Update only src/assets/components/NavBar.jsx.
Focus only on the mobile drawer area.
Make these routes work:
- My Account -> /account
- Saved for Later -> /account/wishlist
- Log In button -> /auth/login
- Sign Up button -> /auth/signup
Do not do general cleanup in this task.
```

## U07

Task ID: U07  
Title: Make product cards link to product detail pages  
Goal: Turn product cards into navigable entry points for the product detail flow.  
Dependencies: U01  
Files to create/modify:

- `sports-store-front-end/src/assets/components/Product/Product_Card.jsx`
- `sports-store-front-end/src/assets/components/Product/Product_List_Page.jsx`

Required context:

- product cards currently only display content
- the product detail route should use `productSlug`

Implementation instructions:

- add a `productSlug` or equivalent prop to the card
- wrap each card in a link to `/products/:productSlug`
- keep styling intact

API/data contracts:

- frontend product list items should include a slug field

Acceptance criteria:

- clicking a product card navigates to the product detail route

Out of scope:

- product detail data loading
- mock data extraction

Local Model Context:

```text
Update:
- src/assets/components/Product/Product_Card.jsx
- src/assets/components/Product/Product_List_Page.jsx
Current problem: product cards are not clickable.
Add product detail navigation using /products/:productSlug.
Keep the current visual layout intact.
```

## U08

Task ID: U08  
Title: Extract product list mock data and add stable identifiers  
Goal: Make product list rendering data-driven and React-safe without introducing backend logic yet.  
Dependencies: U01  
Files to create/modify:

- `sports-store-front-end/src/assets/components/Product/Product_List_Page.jsx`
- one new file for mock product data near the product feature

Required context:

- `Product_List_Page.jsx` currently stores product data inline
- list keys use `item.Name`, which is duplicated

Implementation instructions:

- move the hardcoded array into a separate mock data file
- add stable `id` and `slug` fields
- update the list to use `key={item.id}`

API/data contracts:

- product mock shape should align with the future backend product response

Acceptance criteria:

- mock data is extracted from the component
- each item has a unique id and slug
- React list keys are stable

Out of scope:

- API services
- category filtering

Local Model Context:

```text
Update Product_List_Page and create one small mock-data file.
Current problems:
- product list data is hardcoded inline
- duplicate product names are used as React keys
Move the mock array out of the component.
Add unique id and slug fields.
Use item.id as the React key.
Do not add API calls in this task.
```

## U09

Task ID: U09  
Title: Fix product list grid layout class  
Goal: Correct the malformed grid class so the product list layout is predictable.  
Dependencies: U01  
Files to create/modify:

- `sports-store-front-end/src/assets/components/Product/Product_List_Page.jsx`

Required context:

- current grid class includes malformed `grid-cols-[repeat[auto-fit,...]]`

Implementation instructions:

- replace the malformed class with a valid responsive grid strategy
- preserve the current visual intent: responsive 1/2/3-column listing

API/data contracts: None  
Acceptance criteria:

- product list layout works with valid Tailwind classes

Out of scope:

- card linking
- mock data extraction

Local Model Context:

```text
Update only src/assets/components/Product/Product_List_Page.jsx.
Fix the malformed Tailwind grid class.
Keep the intended layout responsive and simple:
- mobile: 1 column
- tablet: 2 columns
- desktop: 3 columns
Do not change product data behavior in this task.
```

## U10

Task ID: U10  
Title: Clean navbar dead code and unused imports  
Goal: Reduce confusion in `NavBar.jsx` without changing behavior beyond what was fixed earlier.  
Dependencies: U05, U06  
Files to create/modify:

- `sports-store-front-end/src/assets/components/NavBar.jsx`

Required context:

- unused imports and dead helpers exist in the current file
- `ResponsiveSideNavbar`, `useNavigate`, and helper code are currently unused or redundant

Implementation instructions:

- remove unused imports
- remove unused functions and variables
- keep route behavior from U05 and U06 intact

API/data contracts: None  
Acceptance criteria:

- `NavBar.jsx` has no dead navigation helpers or unused imports

Out of scope:

- visual redesign
- splitting navbar into smaller components

Local Model Context:

```text
Update only src/assets/components/NavBar.jsx.
This is a cleanup task after route fixes.
Remove unused imports, dead helper functions, and no-op code.
Keep the current navigation behavior intact.
Do not redesign the component.
```

## U11

Task ID: U11  
Title: Make login and signup screens route-aware  
Goal: Replace empty anchors with router links so auth screens stay inside the SPA flow.  
Dependencies: U04, U07, U08  
Files to create/modify:

- `sports-store-front-end/src/assets/components/Login/Login.jsx`
- `sports-store-front-end/src/assets/components/Login/SingUp.jsx`

Required context:

- both auth screens currently contain empty anchors

Implementation instructions:

- replace anchor-based navigation with `Link` or `NavLink`
- `Login` page should link to `/auth/signup`
- `SignUp` page should link to `/auth/login`

API/data contracts: None  
Acceptance criteria:

- auth screen cross-links navigate correctly without page refresh behavior

Out of scope:

- signup rename
- auth submit behavior

Local Model Context:

```text
Update:
- src/assets/components/Login/Login.jsx
- src/assets/components/Login/SingUp.jsx
Replace empty anchor tags with React Router links.
Routes:
- login page links to /auth/signup
- signup page links to /auth/login
Do not change form submission behavior in this task.
```

## U12

Task ID: U12  
Title: Fix login password show/hide behavior  
Goal: Make the login password visibility toggle actually affect the input field.  
Dependencies: U04  
Files to create/modify:

- `sports-store-front-end/src/assets/components/Login/Login.jsx`

Required context:

- `showpass` state exists, but input type is always `password`

Implementation instructions:

- bind password input `type` to component state
- keep the existing toggle UI, but make the behavior correct
- keep the change limited to the login screen

API/data contracts: None  
Acceptance criteria:

- clicking the visibility control changes the password field type

Out of scope:

- signup password strength logic
- backend auth integration

Local Model Context:

```text
Update only src/assets/components/Login/Login.jsx.
Current problem: show/hide state changes text, but the password input type never changes.
Make the password field use the component state correctly.
Do not change other auth behavior.
```

## U13

Task ID: U13  
Title: Rename signup component to SignUp  
Goal: Normalize signup component naming for readability and maintainability.  
Dependencies: U11  
Files to create/modify:

- `sports-store-front-end/src/assets/components/Login/SingUp.jsx`
- `sports-store-front-end/src/App.jsx`
- any direct import sites of `SingUp`

Required context:

- the file and component are currently named `SingUp`

Implementation instructions:

- rename component to `SignUp`
- rename the file if appropriate
- update imports accordingly
- keep route behavior unchanged

API/data contracts: None  
Acceptance criteria:

- no `SingUp` naming remains in active imports/components

Out of scope:

- auth form redesign
- backend auth integration

Local Model Context:

```text
Rename the signup component from SingUp to SignUp.
Update only the necessary files:
- the signup component file
- App.jsx
- any direct imports that reference the old name
Do not change auth behavior in this task.
```

## U14

Task ID: U14  
Title: Connect cart page into a data-driven render path  
Goal: Convert the cart screen from repeated static blocks into mapped UI over mock cart data.  
Dependencies: U01, U09  
Files to create/modify:

- `sports-store-front-end/src/assets/components/Product/ProductCart.jsx`
- one new mock cart data file near the product/cart feature if needed

Required context:

- `ProductCart.jsx` is currently repeated static markup

Implementation instructions:

- create a small mock cart structure
- render cart items by mapping over data
- render saved-for-later items by mapping over data
- preserve current visual sections

API/data contracts:

- cart item mock shape should align with future backend cart response

Acceptance criteria:

- repeated hardcoded item blocks are removed
- cart content renders from data arrays

Out of scope:

- cart mutation logic
- API calls
- context/state management

Local Model Context:

```text
Update ProductCart to be data-driven.
Current problem: the cart page repeats static markup many times.
Refactor it to map over mock data arrays for:
- cart items
- saved for later items
Keep the current layout structure.
Do not add API calls or app-wide state.
```

## U15

Task ID: U15  
Title: Normalize account layout links and route targets  
Goal: Make account navigation components point to the cleaned route structure.  
Dependencies: U02, U03  
Files to create/modify:

- `sports-store-front-end/src/assets/components/Layout_Pages/MyaccountRootLayout.jsx`
- `sports-store-front-end/src/assets/components/Consumer_Details/CostumerDashbord.jsx`
- `sports-store-front-end/src/assets/components/Consumer_Details/CostumerDashBordSM.jsx`
- `sports-store-front-end/src/assets/components/Consumer_Details/SideNavBtn.jsx`
- `sports-store-front-end/src/assets/components/Consumer_Details/CustomerDetail_Card.jsx`

Required context:

- current account links still reference old route names and inconsistent casing

Implementation instructions:

- update all account navigation targets to the normalized route map
- make sign-out placeholder route safe and predictable, such as `/auth/login` or `/`
- keep component structure intact

API/data contracts: None  
Acceptance criteria:

- all account navigation links use normalized route targets
- mobile and desktop account navigation agree on the same paths

Out of scope:

- account state management
- auth logout implementation

Local Model Context:

```text
Update account navigation targets only.
Files:
- Layout_Pages/MyaccountRootLayout.jsx
- Consumer_Details/CostumerDashbord.jsx
- Consumer_Details/CostumerDashBordSM.jsx
- Consumer_Details/SideNavBtn.jsx
- Consumer_Details/CustomerDetail_Card.jsx
Normalize all route targets to the /account/* structure.
Do not refactor layout behavior yet.
```

## U16

Task ID: U16  
Title: Replace brittle mobile account pathname logic with proper nested layout behavior  
Goal: Stop the mobile account screen from depending on exact pathname string checks.  
Dependencies: U15  
Files to create/modify:

- `sports-store-front-end/src/assets/components/Consumer_Details/CostumerDashBordSM.jsx`
- `sports-store-front-end/src/assets/components/Layout_Pages/ResponsiveRootLayout.jsx`

Required context:

- current mobile account screen uses exact pathname checks
- current layout behavior is brittle for nested pages

Implementation instructions:

- rely on nested routes and `Outlet` behavior instead of exact path string matching
- keep the current mobile account overview screen available for `/account`
- keep nested account pages renderable on mobile

API/data contracts: None  
Acceptance criteria:

- mobile account behavior no longer depends on exact hardcoded pathname strings
- `/account` and nested account pages both render correctly

Out of scope:

- account visual redesign
- auth state protection

Local Model Context:

```text
Update:
- Consumer_Details/CostumerDashBordSM.jsx
- Layout_Pages/ResponsiveRootLayout.jsx
Current problem: mobile account rendering depends on exact pathname string checks.
Refactor to rely on nested routing and Outlet behavior instead.
Keep /account as the mobile overview entry point.
```

## U17

Task ID: U17  
Title: Fix account form data correctness and remove debug logs  
Goal: Make account forms safer for future backend integration and remove noisy console output.  
Dependencies: U15, U16  
Files to create/modify:

- `sports-store-front-end/src/assets/components/Consumer_Details/Profile.jsx`
- `sports-store-front-end/src/assets/components/Consumer_Details/Address.jsx`
- `sports-store-front-end/src/assets/components/Consumer_Details/Wheel_Detail_Form.jsx`

Required context:

- debug logs exist in these components
- wheel form is missing at least one `name` attribute

Implementation instructions:

- remove debug `console.log` statements
- add missing `name` attributes needed for `FormData`
- do not redesign forms

API/data contracts:

- form field names should align with the backend account endpoints wherever practical

Acceptance criteria:

- no temporary debug logs remain in these files
- wheel registration form produces complete `FormData`

Out of scope:

- broader account state refactor
- API submission wiring

Local Model Context:

```text
Update only these files:
- Consumer_Details/Profile.jsx
- Consumer_Details/Address.jsx
- Consumer_Details/Wheel_Detail_Form.jsx
Remove debug console logs.
Add any missing form name attributes needed for FormData.
Keep the forms and layout otherwise unchanged.
```

## U18

Task ID: U18  
Title: Fix UI copy issues and define owner UI placeholders  
Goal: Finish the frontend cleanup pass by correcting visible copy issues and introducing a minimal owner route plan.  
Dependencies: U13, U16, U17  
Files to create/modify:

- `sports-store-front-end/src/assets/components/Consumer_Details/Profile.jsx`
- `sports-store-front-end/src/assets/components/Consumer_Details/Wheel_Detail_Form.jsx`
- `sports-store-front-end/src/App.jsx`
- optionally one minimal placeholder owner component file if needed

Required context:

- visible copy issues include:
  - `Ridjing Styles`
  - `Registre Your Bike`
  - mismatched page headings
- owner flow is not yet present

Implementation instructions:

- fix visible copy errors in the affected files
- add minimal owner routes:
  - `/owner/login`
  - `/owner/dashboard`
  - `/owner/products`
  - `/owner/orders`
  - `/owner/inventory`
  - `/owner/store-profile`
- placeholder owner screens are acceptable

API/data contracts:

- owner route names must align with the backend owner API plan

Acceptance criteria:

- major copy mistakes are corrected
- owner routes exist, even if backed by placeholders

Out of scope:

- real owner dashboard implementation
- owner API integration

Local Model Context:

```text
Finish the UI cleanup by doing two things only:
1. fix visible copy issues like:
   - Ridjing Styles
   - Registre Your Bike
   - mismatched profile heading text
2. add minimal owner routes to App.jsx:
   - /owner/login
   - /owner/dashboard
   - /owner/products
   - /owner/orders
   - /owner/inventory
   - /owner/store-profile
Placeholder owner screens are fine.
Keep this task small.
```

---

## E. Recommended Execution Order

1. U01
2. U02
3. U03
4. U04
5. U05
6. U06
7. U07
8. U08
9. U09
10. U10
11. U11
12. U12
13. U13
14. U14
15. U15
16. U16
17. U17
18. U18

This sequence gives us:

- route stability first
- valid navigation second
- product and cart flow readiness third
- account integration readiness fourth
- owner placeholders last

---

## F. Backend Alignment Check

The current backend plan in `BACKEND_ARCHITECTURE_PLAN.md` still fits this UI plan.

No structural backend rewrite is required right now.

The only alignment rule we should keep firm going forward is:

- UI routes should use plural, normalized paths
- backend API routes should mirror those resource names cleanly

Examples:

- UI: `/products/:productSlug`
- API: `/api/v1/products/:slug`

- UI: `/account/addresses`
- API: `/api/v1/account/addresses`

- UI: `/owner/products`
- API: `/api/v1/owner/products`

If later we decide to change UI route names again, we should update the backend plan at the same time to keep contracts stable.
