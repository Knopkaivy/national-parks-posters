import type { Product } from "@/data/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({products}: ProductGridProps){
    return (
        <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {products.map(product => (
                    <ProductCard key={product.id} product={product}/>
                ))}
        </div>
    )
}