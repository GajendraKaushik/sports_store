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

export async function listProducts({ category, search, page, limit, sort }) {
  const filter = { status: "active" };

  if (category) {
    const categoryDoc = await Category.findOne({
      $or: [{ slug: category.toLowerCase() }, { name: category }],
    });
    if (!categoryDoc) {
      return { items: [], pagination: { page, limit, total: 0, pages: 0 } };
    }
    filter.categoryId = categoryDoc._id;
  }

  if (search) {
    const rx = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    filter.$or = [{ title: rx }, { description: rx }];
  }

  const sortMap = {
    newest: { createdAt: -1 },
    "price-asc": { price: 1 },
    "price-desc": { price: -1 },
  };

  const skip = (page - 1) * limit;
  const [total, docs] = await Promise.all([
    Product.countDocuments(filter),
    Product.find(filter)
      .populate("categoryId", "name slug")
      .sort(sortMap[sort] ?? sortMap.newest)
      .skip(skip)
      .limit(limit),
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

export default { listProducts, getProductBySlug, listCategories };
