'use client'

import { ShoppingCart, X } from "lucide-react";
import Link from 'next/link';
import { useCartStore } from "@/store/cartStore";
import CartLineItem from "./CartLineItem";
import OrderSummary from "./OrderSummary";
import { ROUTES } from "@/constants";

export default function CartDrawer(){
    const items = useCartStore(state => state.items);
    const totalItems = useCartStore(state => state.totalItems);
    const isOpen = useCartStore(state => state.isCartOpen);
    const closeCart = useCartStore(state => state.closeCart);

    return (
        <>
        {/* BACKDROP */}
        {isOpen && (
            <div className="fixed inset-0 z-40 bg-bark-900/40 backdrop-blur-sm" aria-hidden="true" onClick={closeCart}></div>
        )}

        <div role="dialog" aria-modal="true" aria-label="Shopping cart" className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-stone-50 shadow-2xl flex flex-col transform transition-transform duration-300 easo-out-smooth ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200">
                <h2 className="font-display text-xl text-bark-900">
                    Your Cart
                    {totalItems > 0 && (
                        <span className="ml-2 font-sans text-sm font-normal text-bark-400" >{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
                    )}
                </h2>
                <button 
                type="button" 
                className="p-1.5 rounded text-bark-400 hover:text-bark-900 transition:colors focus-visible:ring-2 focus-visible:ring-moss-400 focus-visible:outline-none" 
                onClick={closeCart} 
                aria-label="Close cart" >
                    <X size={18} strokeWidth={2}/>
                </button>
            </div>

            { items.length === 0 ? (
                <div className="flex flex-col items-center justify-center flex-1 gap-4 px-5 text-center">
                    <ShoppingCart size={40} strokeWidth={1} className="text-stone-300" />
                    <div>
                        <p className="font-medium text-bark-700 mb-1">Your cart is empty</p>
                        <p className="text-sm text-bark-400">Discover prints from America's national parks</p>
                    </div>
                    <Link href={ROUTES.home} onClick={closeCart} className="btn-primary mt-2"> Browse prints</Link>
                </div>
            ) : (
            <div className="flex flex-col flex-1 overflow-hidden">
                <ul className="flex-1 overflow-y-auto px-5 divide-y divide-stone-200" >
                    {items.map((item) =>( <CartLineItem key={`${item.productId}-${item.size}-${item.finish}`} item={item} />))}
                </ul>
                <div className="border-t border-stone-200 px-5 pt-4 pb-6">
                    <OrderSummary variant="drawer"/>
                </div>
            </div>
            )}
        </div>
        </>
    )
}