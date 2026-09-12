// U14: mock cart shape aligned with future backend cart response.
// e.g. GET /api/v1/cart -> { items: [...], savedForLater: [...] }
import BikeImg from "../../images/BikeImg/BikeImg-4.webp";

export const mockCartItems = [
  {
    id: "cart-001",
    productId: "prod-001",
    slug: "stumpjumper-comp-alloy",
    name: "Bike Name",
    partNo: "9009142069",
    colour: "Gray",
    size: "XS",
    price: 2250.0,
    quantity: 1,
    inStock: true,
    image: BikeImg,
  },
];

export const mockSavedForLaterItems = [
  {
    id: "saved-001",
    productId: "prod-002",
    slug: "s-works-stumpjumper-evo",
    name: "Bike Name",
    partNo: "9009142069",
    colour: "Gray",
    size: "XS",
    price: 2250.0,
    inStock: true,
    image: BikeImg,
  },
  {
    id: "saved-002",
    productId: "prod-003",
    slug: "turbo-vado-4-0",
    name: "Bike Name",
    partNo: "9009142069",
    colour: "Gray",
    size: "XS",
    price: 2250.0,
    inStock: true,
    image: BikeImg,
  },
];
