// ──────────────────────────────────────────────────────────
//  constants/index.ts
//  Single source of truth for magic strings, labels, and
//  config values used across the app. Import from here,
//  never hardcode these inline.
// ──────────────────────────────────────────────────────────

// ── Shipping & pricing ────────────────────────────────────
export const FREE_SHIPPING_THRESHOLD = 75;      // USD — orders above this ship free
export const FLAT_SHIPPING_RATE      = 6.99;    // USD — flat rate below threshold
export const TAX_RATE                = 0.08;    // 8% — update per jurisdiction or use Stripe Tax

// ── Cart ──────────────────────────────────────────────────
export const MAX_QUANTITY_PER_ITEM = 10;
export const CART_STORAGE_KEY      = "np-poster-cart"; // Zustand persist key

// ── Sort options ──────────────────────────────────────────
export const SORT_OPTIONS = [
  { value: "featured",   label: "Featured"      },
  { value: "new",        label: "New arrivals"  },
  { value: "price-asc",  label: "Price: low–high" },
  { value: "price-desc", label: "Price: high–low" },
  { value: "rating",     label: "Top rated"     },
  { value: "reviews",    label: "Most reviewed" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

// ── Park display labels ───────────────────────────────────
export const PARK_LABELS: Record<string, string> = {
  "yosemite":     "Yosemite",
  "yellowstone":  "Yellowstone",
  "grand-canyon": "Grand Canyon",
  "zion":         "Zion",
  "glacier":      "Glacier",
  "arches":       "Arches",
  "olympic":      "Olympic",
  "acadia":       "Acadia",
  "great-smoky":  "Great Smoky Mountains",
  "grand-teton":  "Grand Teton",
};

// ── Style display labels ──────────────────────────────────
export const STYLE_LABELS: Record<string, string> = {
  "photography": "Photography",
  "vintage":     "Vintage / WPA",
  "minimalist":  "Minimalist",
  "watercolor":  "Watercolor",
};

// ── Finish descriptions ───────────────────────────────────
export const FINISH_DESCRIPTIONS: Record<string, string> = {
  matte:  "Soft, glare-free. Best for photography.",
  glossy: "Vivid color pop. Best for bold graphic art.",
  luster: "Between matte and glossy. Most versatile.",
};

// ── Size display labels ───────────────────────────────────
export const SIZE_LABELS: Record<string, string> = {
  "8x10":  '8" × 10"',
  "11x14": '11" × 14"',
  "16x20": '16" × 20"',
  "18x24": '18" × 24"',
  "24x36": '24" × 36"',
};

// ── Routes ───────────────────────────────────────────────
export const ROUTES = {
  home:       "/",
  cart:       "/cart",
  checkout:   "/checkout",
  product:    (slug: string) => `/products/${slug}`,
  order:      (id: string)   => `/orders/${id}`,
} as const;

// ── Metadata ─────────────────────────────────────────────
export const SITE_NAME        = "National Parks Poster Store";
export const SITE_DESCRIPTION = "Fine art poster prints of America's most beloved national parks. Photography, vintage WPA style, minimalist, and watercolor — in sizes from 8×10 to 24×36.";
export const SITE_URL         = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

// ── Stripe ───────────────────────────────────────────────
export const STRIPE_CURRENCY = "usd";

// ── Toast messages ───────────────────────────────────────
export const TOAST = {
  addedToCart:     "Added to cart",
  removedFromCart: "Removed from cart",
  cartUpdated:     "Cart updated",
  orderSuccess:    "Order placed — thank you!",
  paymentError:    "Payment failed. Please try again.",
  outOfStock:      "This variant is out of stock",
} as const;