'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CartLineItem from "@/components/CartLineItem";
import OrderSummary from "@/components/OrderSummary";
import { useCartStore } from "@/store/cartStore";
import {ROUTES} from "@/constants";

export default function Cart(){
    const router = useRouter();
    const items = useCartStore(state => state.items);
    const totalItems = useCartStore(state => state.totalItems);
    const hasHydrated = useCartStore(state => state.hasHydrated);

    useEffect(() => {
        if(hasHydrated && totalItems === 0){
            router.push(ROUTES.home);
        }
    }, [hasHydrated, totalItems])

    return (
        <div className="page-container py-8 md:py-12">
            <h1 className="font-display text-3xl text-bark-900 mb-8">Your Cart</h1>
            <div className="flex flex-col lg:flex-row gap-10 max-w-5xl mx-auto">
                <ul className="flex-1 min-w-0 divide-y divide-stone-200" >
                    {items.map((item) =>( <CartLineItem key={`${item.productId}-${item.size}-${item.finish}`} item={item} />))}
                </ul>
                <div className="lg:w-80 shrink-0">
                    <OrderSummary variant="page"/>
                </div>
            </div>
        </div>
    )
}