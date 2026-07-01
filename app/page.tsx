import type { Metadata } from "next";
import type { SortValue } from "@/constants";
import { filterProducts, sortProducts, isParkId, isStyleId } from "@/data/products";
import { SITE_NAME, SITE_DESCRIPTION } from "@/constants";
import ProductGrid from "@/components/ProductGrid";
import FilterSidebar from "@/components/FilterSidebar";
import ActiveFilters from "@/components/ActiveFilters";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
}

interface HomePageProps {
  searchParams: Promise<{
    park?: string,
    style?: string,
    sort?: string,
  }>;
}

export default async function HomePage({searchParams}: HomePageProps){
  const {park, style, sort} = await searchParams;
  const filtered = filterProducts({
    park: isParkId(park) ? park : undefined,
    style: isStyleId(style) ? style : undefined,
  });
  const sorted = sortProducts(filtered, (sort as SortValue) ?? 'featured');
  const hasFilters = Boolean(park || style);

  return (
    <div className="page-container py-8 md:py-12">
      {/* PAGE HEADING */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl text-bark-900">
          National Park Prints
        </h1>
        <p className="mt-1.5 text-sm text-bark-500">
          {sorted.length}{' '}
          {sorted.length === 1 ? 'print' : 'prints'}
          {hasFilters ? ' matching your filters' : ' in the collection'}
        </p>
      </div>
      <main className="flex gap-10 items-start">
        <FilterSidebar/>
        <div className="flex flex-col flex-1 min-w-0">
          <ActiveFilters/>
          {sorted.length === 0 ?(
            <div className="py-16 text-center text-bark-400">
              <p className="text-lg mb-2">No prints match these filters.</p>
              <p className="text-sm">Try removing a filter to see more.</p>
            </div>
          ) : (
            <ProductGrid products={sorted} />
          )
        }
        </div>
      </main>
    </div>
  );
}