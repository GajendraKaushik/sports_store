import { AppError } from "../utils/app-error.js";
import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";

function toProductPayload(product) {
  const raw = product.toObject ? product.toObject() : product;
  return {
    id: raw._id.toString(),
    title: raw.title,
    slug: raw.slug,
    description: raw.description,
    shortDescription: raw.shortDescription,
    price: raw.price,
    compareAtPrice: raw.compareAtPrice ?? null,
    currency: raw.currency,
    stockQuantity: raw.stockQuantity,
    isFeatured: raw.isFeatured ?? false,
    featuredOrder: raw.featuredOrder ?? 0,
    group: raw.group ?? "",
    productFamily: raw.productFamily ?? "",
    collection: raw.collection ?? "",
    sizes: raw.sizes ?? [],
    images: raw.images ?? [],
    primaryImage: raw.images?.[0] ?? null,
    specifications: raw.specifications ?? {},
    status: raw.status,
    categoryId:
      typeof raw.categoryId === "object" && raw.categoryId !== null
        ? (raw.categoryId._id?.toString?.() ?? raw.categoryId._id)
        : raw.categoryId,
    category: raw.categoryId?.name
      ? {
          id: raw.categoryId._id.toString(),
          name: raw.categoryId.name,
          slug: raw.categoryId.slug,
        }
      : undefined,
  };
}

export async function listProducts({
  category,
  categories,
  groups,
  sizes,
  families,
  collections,
  priceRanges,
  search,
  page,
  limit,
  sort,
}) {
  const filter = { status: "active" };
  const andClauses = [];

  const parseCsv = (value) =>
    String(value ?? "")
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);

  // Single ?category=<slug> (homepage tiles) + multi ?categories=a,b.
  const categoryInputs = [...parseCsv(categories)];
  if (category) categoryInputs.push(category.trim());
  if (categoryInputs.length > 0) {
    const lowered = categoryInputs.map((c) => c.toLowerCase());
    const docs = await Category.find({
      $or: [{ slug: { $in: lowered } }, { name: { $in: categoryInputs } }],
    }).select("_id");
    if (docs.length === 0) {
      return { items: [], pagination: { page, limit, total: 0, pages: 0 } };
    }
    filter.categoryId =
      docs.length === 1 ? docs[0]._id : { $in: docs.map((d) => d._id) };
  }

  const groupList = parseCsv(groups);
  if (groupList.length > 0) filter.group = { $in: groupList };

  const familyList = parseCsv(families);
  if (familyList.length > 0) filter.productFamily = { $in: familyList };

  const collectionList = parseCsv(collections);
  if (collectionList.length > 0) filter.collection = { $in: collectionList };

  const sizeList = parseCsv(sizes);
  if (sizeList.length > 0) filter.sizes = { $in: sizeList };

  const rangeList = parseCsv(priceRanges)
    .map((range) => {
      // "50-250" or open-ended "1000-" / "1000-Infinity".
      const [rawMin, rawMax] = range.split("-").map((s) => s?.trim());
      const min = Number(rawMin);
      if (!Number.isFinite(min)) return null;
      if (rawMax == null || rawMax === "" || /^inf/i.test(rawMax)) {
        return { min };
      }
      const max = Number(rawMax);
      if (!Number.isFinite(max) || max <= min) return null;
      return { min, max };
    })
    .filter(Boolean);
  if (rangeList.length > 0) {
    andClauses.push({
      $or: rangeList.map(({ min, max }) =>
        max == null ? { price: { $gte: min } } : { price: { $gte: min, $lt: max } },
      ),
    });
  }

  if (search) {
    const rx = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    andClauses.push({ $or: [{ title: rx }, { description: rx }] });
  }
  if (andClauses.length > 0) filter.$and = andClauses;

  const sortMap = {
    featured: { isFeatured: -1, featuredOrder: 1, createdAt: -1 },
    newest: { createdAt: -1 },
    "price-asc": { price: 1 },
    "price-desc": { price: -1 },
  };

  const skip = (page - 1) * limit;
  const query = Product.find(filter).populate("categoryId", "name slug");
  if (sortMap[sort]) query.sort(sortMap[sort]);
  const [total, docs] = await Promise.all([
    Product.countDocuments(filter),
    query.skip(skip).limit(limit),
  ]);

  return {
    items: docs.map(toProductPayload),
    pagination: {
      page,
      limit,
      total,
      pages: total === 0 ? 0 : Math.ceil(total / limit),
    },
  };
}

export async function getProductBySlug(slug) {
  const product = await Product.findOne({
    slug: slug.toLowerCase(),
    status: "active",
  }).populate("categoryId", "name slug");
  if (!product) {
    throw new AppError(404, "Product not found", "NOT_FOUND");
  }
  return toProductPayload(product);
}

export async function listCategories() {
  const docs = await Category.find({ isActive: true }).sort({ name: 1 });
  return docs.map((doc) => ({
    id: doc._id.toString(),
    name: doc.name,
    slug: doc.slug,
  }));
}

// Live option counts for the "Filter & sort" dropdown panel.
// Scoped to active products (+ optional ?category=<slug> tile context),
// independent of the currently selected facet filters.
const PRICE_BUCKETS = [
  { key: "0-50", label: "$0–$50", min: 0, max: 50 },
  { key: "50-250", label: "$50–$250", min: 50, max: 250 },
  { key: "250-500", label: "$250–$500", min: 250, max: 500 },
  { key: "500-1000", label: "$500–$1,000", min: 500, max: 1000 },
  { key: "1000-2500", label: "$1,000–$2,500", min: 1000, max: 2500 },
  { key: "2500-5000", label: "$2,500–$5,000", min: 2500, max: 5000 },
  { key: "5000-", label: "$5,000+", min: 5000, max: null },
];

export async function getFacets({ category } = {}) {
  const baseFilter = { status: "active" };
  if (category) {
    const categoryDoc = await Category.findOne({
      $or: [{ slug: category.toLowerCase() }, { name: category }],
    });
    if (!categoryDoc) {
      return {
        categories: [],
        groups: [],
        sizes: [],
        families: [],
        collections: [],
        priceRanges: PRICE_BUCKETS.map((b) => ({ ...b, count: 0 })),
      };
    }
    baseFilter.categoryId = categoryDoc._id;
  }

  const [categoryCounts, groupCounts, familyCounts, collectionCounts, sizeCounts, priceCounts] =
    await Promise.all([
      Product.aggregate([
        { $match: baseFilter },
        { $group: { _id: "$categoryId", count: { $sum: 1 } } },
      ]),
      Product.aggregate([
        { $match: { ...baseFilter, group: { $nin: ["", null] } } },
        { $group: { _id: "$group", count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      Product.aggregate([
        { $match: { ...baseFilter, productFamily: { $nin: ["", null] } } },
        { $group: { _id: "$productFamily", count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      Product.aggregate([
        { $match: { ...baseFilter, collection: { $nin: ["", null] } } },
        { $group: { _id: "$collection", count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      Product.aggregate([
        { $match: baseFilter },
        { $unwind: "$sizes" },
        { $group: { _id: "$sizes", count: { $sum: 1 } } },
      ]),
      Product.aggregate([
        { $match: baseFilter },
        {
          $group: {
            _id: null,
            prices: { $push: "$price" },
          },
        },
      ]),
    ]);

  const categoryIds = categoryCounts.map((c) => c._id).filter(Boolean);
  const categoryDocs = await Category.find({ _id: { $in: categoryIds } }).select(
    "name slug",
  );
  const categoryById = new Map(categoryDocs.map((d) => [d._id.toString(), d]));
  const categories = categoryCounts
    .map((c) => {
      const doc = categoryById.get(c._id?.toString?.());
      if (!doc) return null;
      return {
        value: doc.slug,
        label: doc.name,
        count: c.count,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.label.localeCompare(b.label));

  const prices = priceCounts[0]?.prices ?? [];
  const priceRanges = PRICE_BUCKETS.map((bucket) => ({
    ...bucket,
    count: prices.filter(
      (p) =>
        p >= bucket.min && (bucket.max == null || p < bucket.max),
    ).length,
  }));

  const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "XXL"];
  const sizeRank = (size) => {
    const idx = SIZE_ORDER.indexOf(size);
    if (idx !== -1) return idx - 100;
    const num = Number(size);
    if (Number.isFinite(num)) return num;
    return 1000;
  };
  const sizes = sizeCounts
    .map((s) => ({ value: s._id, label: s._id, count: s.count }))
    .sort((a, b) => sizeRank(a.value) - sizeRank(b.value) || String(a.value).localeCompare(String(b.value)));

  return {
    categories,
    groups: groupCounts.map((g) => ({ value: g._id, label: g._id, count: g.count })),
    sizes,
    families: familyCounts.map((f) => ({ value: f._id, label: f._id, count: f.count })),
    collections: collectionCounts.map((c) => ({
      value: c._id,
      label: c._id,
      count: c.count,
    })),
    priceRanges,
  };
}

export default { listProducts, getProductBySlug, listCategories, getFacets };
