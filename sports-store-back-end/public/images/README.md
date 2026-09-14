# Product images

The seed generates one category-themed dummy SVG per product here
(`<product-slug>.svg`) and stores `PUBLIC_BASE_URL/images/<file>` as the
product's image URL, so every product in the store has a presentable picture
without any real photography.

## Using your own images

1. Save the real image anywhere in this folder named exactly after the
   product's slug, e.g. `turbo-vado-4-0.jpg`, `roubaix-expert.webp`.
   Supported extensions: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.gif`
   (these win over the generated `.svg`).
2. Re-run the seed from the backend folder:

   ```
   npm run seed
   ```

Each product has **3 gallery views**: the main image (`<slug>.svg`) plus two
extra angles (`<slug>-2.svg`, `<slug>-3.svg`). To give a view a real photo,
save it as `<slug>-2.jpg` / `<slug>-3.jpg` the same way — the product detail
page shows all of them as clickable thumbnails under the main frame.

The product now serves your image at `/images/<file>` everywhere — homepage
slider, product list, product detail, and the owner panel.

Slugs are listed in `src/seed/seed.js` (`MOCK_PRODUCTS`) and can be seen on
each dummy image itself.
