'use client'

import Link from 'next/link';
import { useCartStore } from "@/store/cartStore";
import {FREE_SHIPPING_THRESHOLD, ROUTES} from '@/constants';

interface OrderSummaryProps {
    variant: 'page' | 'drawer' | 'checkout'
}

export default function OrderSummary({variant = 'page'}: OrderSummaryProps){
    const totalPrice = useCartStore(state => state.totalPrice);
    const shippingCost = useCartStore(state => state.shippingCost);
    const totalWithShipping = useCartStore(state => state.totalWithShipping);
    const closeCart = useCartStore(state => state.closeCart);
    const remaining = FREE_SHIPPING_THRESHOLD - totalPrice;

    return (
        <div className='bg-stone-100 rounded-lg p-6 flex flex-col gap-5' >
            <h2 className="font-display text-xl text-bark-900">Order Summary</h2>
            {/* TOTALS */}
            <div className="space-y-2 text-sm">
                <div className="flex justify-between text-bark-700">
                    <span>Subtotal</span>
                    <span className='font-mono tabular-nums' >${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-bark-500">
                    <span>Shipping</span>
                    <span className="font-mono tabular-nums">
                        {shippingCost === 0 ? (
                            <span className='text-moss-600 font-medium'>Free</span>
                        ) : (
                            `$${shippingCost.toFixed(2)}`
                        )}
                    </span>
                </div>
                <div className="flex justify-between font-semibold text-bark-900 pt-2 border-t border-stone-300">
                    <span>Total</span>
                    <span className="font-mono tabular-nums">
                        ${totalWithShipping.toFixed(2)}
                    </span>
                </div>
            </div>
            {/* FREE SHIPPING PROGRESS */}
            {shippingCost !== 0 && variant !== 'checkout' && (
                <div className="space-y-1.5">
                    <p className="text-xs text-bark-500">
                        Add{" "}
                        <span className="font-semibold text-bark-700">
                            ${remaining.toFixed(2)}
                        </span> {" "}more for free shipping
                    </p>
                    {/* PROGRESS BAR */}
                    <div className="h-1 w-full rounded-full bg-stone-300 overflow-hidden">
                        <div className="h-full rounded-full bg-moss-600 transition-all duration-300" style={{width: `${Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100)}%`}}></div>
                    </div>
                </div>
            )}
            {shippingCost === 0 && variant !== 'checkout' && (
                <p className="text-xs text-moss-600 font-medium">You've unlocked free shipping!</p>
            )}

            <div className="flex flex-col gap-2">
                {variant === 'drawer' && (
                    <Link href={ROUTES.cart} onClick={closeCart} className='btn-primary w-full justify-center py-3' >Go to cart</Link>
                )}
                {variant === 'page' && (
                    <>
                        <Link href={ROUTES.checkout} className='btn-primary w-full justify-center py-3' >Proceed to check out</Link>
                        <Link href={ROUTES.home} className='btn-ghost w-full justify-center' >Continue shopping</Link>
                    </>
                )}
                {variant === 'checkout' &&(
                    <Link href={ROUTES.cart} className='btn-primary w-full justify-center py-3' >Back to cart</Link>
                )}
            </div>
        </div>
    )
}