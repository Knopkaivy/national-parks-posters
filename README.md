# National Parks Poster Store

A full-stack eCommerce portfolio project built with Next.js 15, TypeScript, Stripe, and Tailwind CSS v4. Fine art poster prints of America's national parks — photography, vintage WPA style, minimalist, and watercolor.


---

## Features

- **Product catalog** — 18+ poster prints across 10 national parks and 4 styles
- **Filtering** — filter by park and style, URL-synced so filters are shareable
- **Product detail** — variant picker (size + finish), dynamic pricing, stock awareness, related prints
- **Cart** — slide-in drawer + full cart page, quantity controls, free shipping threshold with progress bar
- **Checkout** — Stripe Elements integration with real payment processing (test mode)
- **Order confirmation** — persisted order summary with line items and totals

## Tech Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Payments | Stripe |
| State | Zustand (with localStorage persistence) |
| Forms | React Hook Form |
| Icons | Lucide React |
| Fonts | Playfair Display + Inter (next/font) |
| Toasts | Sonner |
| Images | Unsplash |

## Project Structure

```
app/
  page.tsx                        # Home — product grid + filters
  products/[slug]/page.tsx        # Product detail
  cart/page.tsx                   # Cart page
  checkout/page.tsx               # Stripe checkout
  orders/[id]/page.tsx            # Order confirmation
  api/create-payment-intent/      # Stripe API route (server-side)
components/
  Navbar.tsx                      # Sticky navbar with cart badge
  CartDrawer.tsx                  # Slide-in cart drawer
  FilterSidebar.tsx               # Park + style filters
  ProductCard.tsx                 # Grid card
  ProductInfo.tsx                 # Variant picker + add to cart
  CheckoutForm.tsx                # Stripe Elements form
data/
  products.ts                     # Mock product data + helper functions
  types.ts                        # TypeScript interfaces
store/
  cartStore.ts                    # Zustand cart store
  orderStore.ts                   # Zustand order store
lib/
  stripe.ts                       # Server-side Stripe instance
  stripe-client.ts                # Browser-side Stripe loader
constants/
  index.ts                        # Routes, labels, pricing constants
```

## Getting Started

**1. Clone the repo**
```bash
git clone https://github.com/Knopkaivy/national-parks-posters.git
cd national-parks-posters
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**

Copy `.env.example` to `.env.local` and fill in your Stripe test keys:
```bash
cp .env.example .env.local
```

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
UNSPLASH_ACCESS_KEY=your_access_key_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Get your test keys from [dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)

Get your Unsplash API key at [unsplash.com/developers](https://unsplash.com/developers) — 
free tier gives 50 requests/hour, plenty for development and portfolio use.
Note: the project currently uses hardcoded Unsplash photo IDs so this key is 
optional unless you switch to dynamic photo search.

**4. Run the dev server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)


## Key Implementation Details

**URL-synced filters** — filter state lives in the URL (`?park=arches&style=vintage`) via `useSearchParams` and `router.replace`. Filters are shareable and survive page refresh.

**Variant-aware stock** — the size and finish pickers hide out-of-stock combinations using `stockByVariant` lookup. Changing size resets the finish selection if the current finish is unavailable in the new size.

**Server/client split** — product filtering and sorting happen server-side in `page.tsx`. Only interactive components (`FilterSidebar`, `CartDrawer`, `ProductInfo`) are client components.

**Stripe security** — the secret key never touches the browser. A Next.js Route Handler (`/api/create-payment-intent`) creates the `PaymentIntent` server-side and returns only the `clientSecret` to the client.

**Hydration safety** — Zustand stores use a `hasHydrated` flag to prevent redirect logic from firing before localStorage rehydrates, avoiding flicker on page refresh.

---

Built as a front-end engineering portfolio project. Not a real store.
