import Img1 from "../../images/BikeImg/BikeImg-4.webp";

// Temporary frontend-only mock dataset for the product list.
// Shape intentionally mirrors the future backend product response:
// GET /api/v1/products -> [{ id, slug, name, image, offerPrice, originalPrice }]
// Legacy capitalized fields (Name, OfferPrice, ...) are kept alongside the
// normalized fields so existing components keep working until API integration.

export const mockProducts = [
  {
    id: "prod-001",
    slug: "stumpjumper-comp-alloy",
    img: Img1,
    Name: "Stumpjumper Comp Alloy",
    OfferPrice: "6,499.99",
    OriginalPrice: "11,500.00",
  },
  {
    id: "prod-002",
    slug: "s-works-stumpjumper-evo",
    img: Img1,
    Name: "S-Works Stumpjumper EVO",
    OfferPrice: "5,499.99",
    OriginalPrice: "10,500.00",
  },
  {
    id: "prod-003",
    slug: "turbo-vado-4-0",
    img: Img1,
    Name: "Turbo Vado 4.0",
    OfferPrice: "2,749.99",
    OriginalPrice: "4,000.00",
  },
  {
    id: "prod-004",
    slug: "turbo-como-sl-4-0",
    img: Img1,
    Name: "Turbo Como SL 4.0",
    OfferPrice: "1,799.99",
    OriginalPrice: "3,250.00",
  },
  {
    id: "prod-005",
    slug: "diverge-comp-e5",
    img: Img1,
    Name: "Diverge Comp E5",
    OfferPrice: "1,999.99",
    OriginalPrice: "2,500.00",
  },
  {
    id: "prod-006",
    slug: "turbo-vado-4-0-step-through",
    img: Img1,
    Name: "Turbo Vado 4.0 Step-Through",
    OfferPrice: "2,749.99",
    OriginalPrice: "4,000.00",
  },
  {
    id: "prod-007",
    slug: "roubaix-expert",
    img: Img1,
    Name: "Roubaix Expert",
    OfferPrice: "5,499.99",
    OriginalPrice: "8,000.00",
  },
  {
    id: "prod-008",
    slug: "roubaix-expert-2",
    img: Img1,
    Name: "Roubaix Expert",
    OfferPrice: "5,499.99",
    OriginalPrice: "8,000.00",
  },
  {
    id: "prod-009",
    slug: "roubaix-expert-3",
    img: Img1,
    Name: "Roubaix Expert",
    OfferPrice: "5,499.99",
    OriginalPrice: "8,000.00",
  },
];

export default mockProducts;
