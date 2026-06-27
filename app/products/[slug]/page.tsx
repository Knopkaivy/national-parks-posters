import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";

import {getProductBySlug, products, filterProducts} from '@/data/products';
import { PARK_LABELS, ROUTES } from "@/constants";
import Breadcrumb from "@/components/Breadcrumb";
import ProductGrid from "@/components/ProductGrid";
import ProductInfo from "@/components/ProductInfo";

export function generateStaticParams(){
    return products.map(product => ({slug: product.slug}));
}

interface PageProps {
    params: Promise<{slug: string}>;
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
    const {slug} = await params;
    const product = getProductBySlug(slug);
    if(!product) return {};
    return {
        title: product.name,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: [{url: product.images[0].url, alt: product.images[0].alt}],
        },
    };
}

export default async function ProductPage({params}: PageProps) {
    const {slug} = await params;
    const product = getProductBySlug(slug);
    if(!product) notFound();

    const related = filterProducts({park: product.park}).filter(park => park.id !== product.id).slice(0, 3);

    return (
        <div className="page-container py-8 md:py-12">
            <Breadcrumb park={product.park} parkLabel={PARK_LABELS[product.park]}/>
            <div className="mt-6 max-w-5xl mx-auto">
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
                    {/* IMAGE */}
                    <div className="bg-white shadow-lg p-4">
                        <div className="relative aspect-[2/3]">
                            <Image src={product.images[0].url} alt={product.images[0].alt} fill sizes="(max-width: 1024px) 100vw, 50 vw" className="object-cover" priority />
                        </div>
                    </div>
                    {/* DETAILS */}
                    <ProductInfo product={product} />
                </div>
            </div>
            {/* YOU MAY ALSO LIKE */}
            {related.length > 0 && (
                <section className="mt-16 md:mt-24">
                    <h2 className="font-display text-2xl text-bark-900 mb-6" >More from {PARK_LABELS[product.park]}</h2>
                    <ProductGrid products={related} />
                </section>
            )}
        </div>
    )
}