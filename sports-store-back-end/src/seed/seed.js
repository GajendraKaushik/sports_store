import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";
import { Store } from "../models/Store.js";
import { User } from "../models/User.js";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/sports_store";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

// Mirrors sports-store-front-end/src/assets/components/Product/products.mock.js
// (string prices converted to Numbers, legacy Name/OfferPrice dropped).
const MOCK_PRODUCTS = [
  {
    slug: "stumpjumper-comp-alloy",
    title: "Stumpjumper Comp Alloy",
    price: 6499.99,
    compareAtPrice: 11500.0,
    category: "bikes",
  },
  {
    slug: "s-works-stumpjumper-evo",
    title: "S-Works Stumpjumper EVO",
    price: 5499.99,
    compareAtPrice: 10500.0,
    category: "bikes",
  },
  {
    slug: "turbo-vado-4-0",
    title: "Turbo Vado 4.0",
    price: 2749.99,
    compareAtPrice: 4000.0,
    category: "bikes",
  },
  {
    slug: "turbo-como-sl-4-0",
    title: "Turbo Como SL 4.0",
    price: 1799.99,
    compareAtPrice: 3250.0,
    category: "bikes",
  },
  {
    slug: "diverge-comp-e5",
    title: "Diverge Comp E5",
    price: 1999.99,
    compareAtPrice: 2500.0,
    category: "bikes",
  },
  {
    slug: "turbo-vado-4-0-step-through",
    title: "Turbo Vado 4.0 Step-Through",
    price: 2749.99,
    compareAtPrice: 4000.0,
    category: "bikes",
  },
  {
    slug: "roubaix-expert",
    title: "Roubaix Expert",
    price: 5499.99,
    compareAtPrice: 8000.0,
    category: "bikes",
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
];

const CATEGORIES = [
  { name: "Bikes", slug: "bikes" },
  { name: "Wheels", slug: "wheels" },
  { name: "Components", slug: "components" },
];

function placeholderImage(slug) {
  return `https://placehold.co/800x600?text=${encodeURIComponent(slug)}`;
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
          images: [placeholderImage(item.slug)],
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
