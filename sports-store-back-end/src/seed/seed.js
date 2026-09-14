import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import fs from "node:fs";
import mongoose from "mongoose";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";
import { Store } from "../models/Store.js";
import { User } from "../models/User.js";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/sports_store";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

// Product images live in public/images and are served by the API at /images.
// The seed prefers a real file the owner dropped in (<slug>.jpg/.png/.webp/…)
// and otherwise generates a themed SVG dummy so every product has an image.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.join(__dirname, "..", "..", "public", "images");
const PUBLIC_BASE_URL =
  process.env.PUBLIC_BASE_URL ??
  `http://localhost:${process.env.PORT ?? 5001}`;

// Mirrors the homepage carousels. 9 migrated mock products + 10 added so every
// homepage category tile (carousel 1) links to a non-empty filtered list.
const MOCK_PRODUCTS = [
  {
    slug: "stumpjumper-comp-alloy",
    title: "Stumpjumper Comp Alloy",
    price: 6499.99,
    compareAtPrice: 11500.0,
    category: "mountain-bikes",
  },
  {
    slug: "s-works-stumpjumper-evo",
    title: "S-Works Stumpjumper EVO",
    price: 5499.99,
    compareAtPrice: 10500.0,
    category: "mountain-bikes",
  },
  {
    slug: "turbo-vado-4-0",
    title: "Turbo Vado 4.0",
    price: 2749.99,
    compareAtPrice: 4000.0,
    category: "electric-bikes",
  },
  {
    slug: "turbo-como-sl-4-0",
    title: "Turbo Como SL 4.0",
    price: 1799.99,
    compareAtPrice: 3250.0,
    category: "electric-bikes",
  },
  {
    slug: "turbo-vado-4-0-step-through",
    title: "Turbo Vado 4.0 Step-Through",
    price: 2749.99,
    compareAtPrice: 4000.0,
    category: "electric-bikes",
  },
  {
    slug: "diverge-comp-e5",
    title: "Diverge Comp E5",
    price: 1999.99,
    compareAtPrice: 2500.0,
    category: "road-bikes",
  },
  {
    slug: "roubaix-expert",
    title: "Roubaix Expert",
    price: 5499.99,
    compareAtPrice: 8000.0,
    category: "road-bikes",
  },
  {
    slug: "roubaix-expert-2",
    title: "Roubaix Expert",
    price: 5499.99,
    compareAtPrice: 8000.0,
    category: "wheels",
  },
  {
    slug: "roubaix-expert-3",
    title: "Roubaix Expert",
    price: 5499.99,
    compareAtPrice: 8000.0,
    category: "components",
  },
  // Added so every homepage tile opens a populated list.
  {
    slug: "sirrus-4-0",
    title: "Sirrus 4.0",
    price: 1149.99,
    compareAtPrice: 1350.0,
    category: "active-bikes",
  },
  {
    slug: "sirrus-x-3-0",
    title: "Sirrus X 3.0",
    price: 899.99,
    compareAtPrice: 1100.0,
    category: "active-bikes",
  },
  {
    slug: "riprock-20",
    title: "Riprock 20",
    price: 449.99,
    compareAtPrice: 525.0,
    category: "kids-bikes",
  },
  {
    slug: "riprock-24",
    title: "Riprock 24",
    price: 499.99,
    compareAtPrice: 575.0,
    category: "kids-bikes",
  },
  {
    slug: "ground-control-grid-tire",
    title: "Ground Control GRID Tire",
    price: 54.99,
    compareAtPrice: 65.0,
    category: "tires",
  },
  {
    slug: "fast-trak-control-tire",
    title: "Fast Trak Control Tire",
    price: 59.99,
    compareAtPrice: 70.0,
    category: "tires",
  },
  {
    slug: "rbx-comp-jersey",
    title: "RBX Comp Jersey",
    price: 79.99,
    compareAtPrice: 95.0,
    category: "apparel",
  },
  {
    slug: "trail-liner-shorts",
    title: "Trail Liner Shorts",
    price: 99.99,
    compareAtPrice: 120.0,
    category: "apparel",
  },
  {
    slug: "stix-switch-headlight",
    title: "Stix Switch Headlight",
    price: 44.99,
    compareAtPrice: 55.0,
    category: "accessories",
  },
  {
    slug: "ambient-qi2-mount",
    title: "Ambient Qi2 Mount",
    price: 39.99,
    compareAtPrice: 49.0,
    category: "accessories",
  },
];

// "bikes"/"wheels"/"components" predate the homepage tiles and are kept for
// the owner panel; the tile categories match ImageSlider.jsx 1:1.
const CATEGORIES = [
  { name: "Bikes", slug: "bikes" },
  { name: "Wheels", slug: "wheels" },
  { name: "Components", slug: "components" },
  { name: "Electric Bikes", slug: "electric-bikes" },
  { name: "Road Bikes", slug: "road-bikes" },
  { name: "Mountain Bikes", slug: "mountain-bikes" },
  { name: "Active Bikes", slug: "active-bikes" },
  { name: "Kids Bikes", slug: "kids-bikes" },
  { name: "Tires", slug: "tires" },
  { name: "Apparel", slug: "apparel" },
  { name: "Accessories", slug: "accessories" },
];

// Themed art per category for the generated dummy images.
const CATEGORY_ART = {
  "bikes": { emoji: "🚲", color: "#334155" },
  "wheels": { emoji: "🛞", color: "#475569" },
  "components": { emoji: "🔧", color: "#57534e" },
  "electric-bikes": { emoji: "⚡", color: "#b45309" },
  "road-bikes": { emoji: "🚴", color: "#1d4ed8" },
  "mountain-bikes": { emoji: "🏔️", color: "#15803d" },
  "active-bikes": { emoji: "🏃", color: "#c2410c" },
  "kids-bikes": { emoji: "🧒", color: "#be185d" },
  "tires": { emoji: "🛞", color: "#4b5563" },
  "apparel": { emoji: "👕", color: "#7c3aed" },
  "accessories": { emoji: "🎒", color: "#0369a1" },
  default: { emoji: "🚲", color: "#374151" },
};

const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "avif", "gif", "svg"];

// Gallery views generated per product: <slug>.svg, <slug>-2.svg, <slug>-3.svg.
const PRODUCT_IMAGE_VIEWS = ["Front", "Detail", "Side"];

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function dummySvg(item, viewIndex = 0) {
  const art = CATEGORY_ART[item.category] ?? CATEGORY_ART.default;
  const title = escapeXml(item.title);
  const viewLabel = PRODUCT_IMAGE_VIEWS[viewIndex] ?? `View ${viewIndex + 1}`;
  // Slightly different gradient direction per view so the gallery thumbs
  // are visually distinguishable even before real photos arrive.
  const x2 = viewIndex % 2 === 0 ? 1 : 0;
  const y2 = viewIndex % 2 === 0 ? 1 : 0.2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${x2}" y2="${y2}">
      <stop offset="0" stop-color="${art.color}"/>
      <stop offset="1" stop-color="#111827"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  <text x="400" y="300" font-size="150" text-anchor="middle">${art.emoji}</text>
  <text x="400" y="440" font-size="40" font-family="Arial, Helvetica, sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">${title}</text>
  <text x="400" y="490" font-size="20" font-family="Arial, Helvetica, sans-serif" fill="#d1d5db" text-anchor="middle">dummy image · view ${viewIndex + 1} of ${PRODUCT_IMAGE_VIEWS.length} (${escapeXml(viewLabel)}) · drop the real one into public/images/</text>
</svg>
`;
}

function findExistingImageFile(slug) {
  // Real photo formats win over the generated SVG so a dropped-in file is
  // picked up on the next seed run without any code changes.
  const files = fs.readdirSync(IMAGES_DIR);
  for (const ext of IMAGE_EXTENSIONS) {
    const hit = files.find(
      (file) => file.toLowerCase() === `${slug}.${ext}`,
    );
    if (hit) return hit;
  }
  return null;
}

function resolveProductImage(item, viewIndex = 0) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
  // View 1 uses the bare slug (<slug>.svg); extra views get -2, -3, …
  const base = viewIndex === 0 ? item.slug : `${item.slug}-${viewIndex + 1}`;
  let fileName = findExistingImageFile(base);
  if (!fileName) {
    fileName = `${base}.svg`;
    fs.writeFileSync(
      path.join(IMAGES_DIR, fileName),
      dummySvg(item, viewIndex),
      "utf8",
    );
    console.log(`generated dummy image public/images/${fileName}`);
  }
  return `${PUBLIC_BASE_URL}/images/${fileName}`;
}

async function upsertOwner() {
  const email = "owner@sportsstore.local";
  let owner = await User.findOne({ email });
  if (!owner) {
    const passwordHash = await bcrypt.hash("OwnerPass123!", 10);
    owner = await User.create({
      firstName: "Store",
      lastName: "Owner",
      email,
      passwordHash,
      role: "owner",
      isActive: true,
    });
    console.log(`created owner ${email} / OwnerPass123!`);
  } else if (owner.role !== "owner") {
    owner.role = "owner";
    await owner.save();
    console.log(`promoted ${email} to owner`);
  } else {
    console.log(`owner exists: ${email}`);
  }
  return owner;
}

async function upsertStore(owner) {
  const slug = "main-store";
  let store = await Store.findOne({ slug });
  if (!store) {
    store = await Store.create({
      ownerId: owner._id,
      name: "Main Store",
      slug,
      description: "Flagship sports store",
      contactEmail: owner.email,
      isActive: true,
    });
    console.log("created store main-store");
  } else {
    if (store.ownerId.toString() !== owner._id.toString()) {
      store.ownerId = owner._id;
      await store.save();
    }
    console.log("store exists: main-store");
  }
  return store;
}

async function upsertCategories() {
  const bySlug = new Map();
  for (const cat of CATEGORIES) {
    const doc = await Category.findOneAndUpdate(
      { slug: cat.slug },
      { $set: { name: cat.name, slug: cat.slug, isActive: true } },
      { new: true, upsert: true },
    );
    bySlug.set(cat.slug, doc);
    console.log(`upserted category ${cat.slug}`);
  }
  return bySlug;
}

async function upsertProducts(store, categoriesBySlug) {
  for (const item of MOCK_PRODUCTS) {
    const category = categoriesBySlug.get(item.category);
    await Product.findOneAndUpdate(
      { slug: item.slug },
      {
        $set: {
          storeId: store._id,
          categoryId: category._id,
          title: item.title,
          slug: item.slug,
          description: `${item.title} — migrated from frontend mock data.`,
          shortDescription: item.title,
          price: item.price,
          compareAtPrice: item.compareAtPrice,
          currency: "USD",
          stockQuantity: 25,
          sizes: SIZES,
          images: PRODUCT_IMAGE_VIEWS.map((_view, viewIndex) =>
            resolveProductImage(item, viewIndex),
          ),
          specifications: {},
          status: "active",
        },
      },
      { upsert: true },
    );
    console.log(`upserted product ${item.slug}`);
  }
}

async function main() {
  mongoose.set("strictQuery", true);
  await mongoose.connect(MONGODB_URI);
  console.log(`connected: ${MONGODB_URI}`);
  try {
    const owner = await upsertOwner();
    const store = await upsertStore(owner);
    const categoriesBySlug = await upsertCategories();
    await upsertProducts(store, categoriesBySlug);
    console.log(
      `images dir: ${IMAGES_DIR}`,
      `\n→ to use a real photo: save it as <product-slug>.jpg/.png/.webp in public/images/ and re-run "npm run seed"`,
    );
    const count = await Product.countDocuments({ status: "active" });
    console.log(`done. active products: ${count}`);
  } finally {
    await mongoose.disconnect();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
