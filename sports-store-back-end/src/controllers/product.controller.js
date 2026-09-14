import * as productService from "../services/product.service.js";

export async function listProducts(req, res) {
  const result = await productService.listProducts(req.query);
  res.status(200).json({ success: true, data: result });
}

export async function getProductBySlug(req, res) {
  const product = await productService.getProductBySlug(req.params.slug);
  res.status(200).json({ success: true, data: { product } });
}

export async function listCategories(req, res) {
  const categories = await productService.listCategories();
  res.status(200).json({ success: true, data: { categories } });
}

export async function getFacets(req, res) {
  const facets = await productService.getFacets(req.query);
  res.status(200).json({ success: true, data: { facets } });
}

export default { listProducts, getProductBySlug, listCategories, getFacets };
