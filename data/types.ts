export type ParkId =
  | "yosemite" 
  | "yellowstone" 
  | "grand-canyon"
  | "zion" 
  | "glacier" 
  | "arches"
  | "olympic" 
  | "acadia" 
  | "great-smoky" 
  | "grand-teton";

export type SizeId   = "8x10" | "11x14" | "16x20" | "18x24" | "24x36";
export type FinishId = "matte" | "glossy" | "luster";
export type StyleId  = "photography" | "vintage" | "minimalist" | "watercolor";

export interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductFilters {
  park?:       ParkId | undefined;
  style?:      StyleId | undefined;
  featured?:   boolean;
  newArrival?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  park: ParkId;
  style: StyleId;
  basePrice: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  inStock: boolean;
  featured: boolean;
  newArrival: boolean;
  description: string;
  details: string[];
  images: ProductImage[];
  sizes: SizeId[];
  finishes: FinishId[];
  stockByVariant: Partial<Record<`${SizeId}-${FinishId}`, number>>;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  park: ParkId;
  size: SizeId;
  finish: FinishId;
  price: number;
  quantity: number;
  image: ProductImage;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}