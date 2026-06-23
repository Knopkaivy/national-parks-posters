export default function HomeLoading() {
  return (
    <div className="page-container py-8 md:py-12 animate-pulse">

      {/* Heading skeleton */}
      <div className="mb-8 space-y-2">
        <div className="h-9 w-56 rounded bg-stone-200" />
        <div className="h-4 w-36 rounded bg-stone-200" />
      </div>

      <div className="flex gap-10 items-start">

        {/* Sidebar skeleton — mirrors FilterSidebar width and structure */}
        <div className="hidden lg:flex flex-col gap-3 w-52 shrink-0">
          <div className="h-3 w-10 rounded bg-stone-200" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-28 rounded bg-stone-200" />
          ))}

          <div className="h-3 w-10 rounded bg-stone-200 mt-4" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-4 w-20 rounded bg-stone-200" />
          ))}
        </div>

        {/* Grid skeleton — 12 cards, same layout as ProductGrid */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex flex-col">

              {/* Mirrors the white card frame from ProductCard */}
              <div className="bg-white shadow-lg p-3">
                <div className="aspect-[2/3] bg-stone-200" />
              </div>

              {/* Mirrors the three text lines below the card */}
              <div className="mt-3 space-y-1.5">
                <div className="h-2.5 w-16 rounded bg-stone-200 mx-auto" />
                <div className="h-4 w-32 rounded bg-stone-200 mx-auto" />
                <div className="h-3 w-14 rounded bg-stone-200 mx-auto" />
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}