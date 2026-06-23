import Image from "next/image";
import type { Product } from "@/data/types";
import Link from "next/link";
import { ROUTES, PARK_LABELS } from "@/constants";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({product}: ProductCardProps){
    const { basePrice, images, name, slug, park, newArrival, tags } = product;

  const isBestseller = tags.includes("bestseller");
    return (
        <Link href={ROUTES.product(slug)} >
            <div className="flex flex-col p-12">
                <div className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out p-3 mb-14 md:mb-16">
                    <div className="relative aspect-[2/3] overflow-hidden hover:opacity-90 transition-opacity duration-300 ease-in-out">
                        <Image src={images[0].url} alt={images[0].alt} fill sizes="(max-width:640px) 50vw, 25vw" className="object-cover" />
                            {(newArrival || isBestseller) && (
                            <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
                                {newArrival && (
                                <span className="badge-moss text-[10px]">New</span>
                                )}
                                {isBestseller && (
                                <span className="badge-sandstone text-[10px]">Bestseller</span>
                                )}
                            </div>
                            )}
                    </div>
                </div>
                    <p className="text-[10px] text-center font-semibold uppercase tracking-[0.12em] text-bark-400">
                        {PARK_LABELS[park] ?? park}
                    </p>
                <p className="text-bark-900 text-center hover:text-bark-600 transition-colors duration-300 ease-in-out" >{name}</p>
                <p className="text-bark-900 text-center font-bold">${basePrice.toFixed(2)}</p>
            </div>
        </Link>
    )
}