'use client'

import Image from "next/image";
import Link from 'next/link';
import { useParams } from "next/navigation";
import { useOrderStore } from "@/store/orderStore";
import type { Order } from "@/data/types";
import { PARK_LABELS, ROUTES } from "@/constants";

export default function OrderPage(){
    const params = useParams<{id: string}>();
    const order = useOrderStore<Order | null>(state => state.order);

    if (!order || order.id !== params.id) {
        return (
        <div className="page-container py-16 text-center">
            <p className="font-display text-xl text-bark-900 mb-2">Order not found</p>
            <p className="text-sm text-bark-500 mb-6">
            This order may have expired or the link is incorrect.
            </p>
            <Link href={ROUTES.home} className="btn-secondary">
            Back to shopping
            </Link>
        </div>
    );
}
    return (
        <div className="page-container py-8 md:py-12">
            <div className="flex flex-col items-center text-center mb-12">
                <h1 className="font-diplay text-3xl text-bark-900 mb-2" >Thank you, {order.firstName}!</h1>
                <p className="text-sm text-bark-500">
                    Your order has been confirmed.
                </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-10 max-w-5xl mx-auto">
                <div className="flex-1 min-w-0 space-y-8">
                    {/* ORDER META */}
                    <div className="bg-stone-100 rounded-lg p-5 space-y-1.5">
                        <div className="flex justify-between text-sm">
                            <span className="text-bark-500">Order number</span>
                            <span className="font-mono text-bark-900">{order.id.slice(0, 16)}...</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-bark-500">Date</span>
                            <span className="text-bark-900">{new Date(order.createdAt).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</span>

                        </div>
                    </div>
                    <div className="space-y-1 text-sm text-bark-600">
                        <p className="">Your prints ship within 3-5 business days</p>
                        <p className="">You'll receive a confirmation at <span className="font-medium text-bark-900">{order.email}</span>.</p>
                    </div>
                    {/* ITEMS */}
                    <div className="">
                        <h2 className="font-display text-lg text-bark-900 mb-4">
                            Items
                        </h2>
                        <ul className="divide-y divide-stone-200" >
                            {order.items.map((item) =>(
                                <li key={`${item.productId}-${item.size}-${item.finish}`} className="flex gap-4 py-4" >
                                    <div className="shrink-0 w-16 bg-white shadow-md p-1.5">
                                        <div className="relative aspect-[2/3]">
                                            <Image src={item.image.url} alt={item.image.alt} fill sizes="64px" className="object-cover" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-bark-400">{PARK_LABELS[item.park] ?? item.park}</p>
                                        <Link href={ROUTES.product(item.slug)} className="text-sm font-medium text-bark-900 leading-snug underline underline-offset-2 decoration-stone-300 hover:text-moss-700 hover:decoration-moss-400 transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-moss-400 focus-visible:outline-none">{item.name}</Link>
                                        <p className="text-xs text-bark-400 mt-0.5" >{item.size} · {item.finish} · Qty {item.quantity}</p>
                                        <p className="font-mono text-sm text-bark-900 tabular-nums shrink-0" >${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* ORDER SUMMARY */}
                <div className="lg:w-80 shrink-0">
                    <div className='bg-stone-100 rounded-lg p-6 flex flex-col gap-5' >
                        <h2 className="font-display text-xl text-bark-900">Order Summary</h2>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-bark-700">
                                <span>Subtotal</span>
                                <span className='font-mono tabular-nums' >${order.total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-bark-500">
                                <span>Shipping</span>
                                <span className="font-mono tabular-nums">
                                    {order.shipping === 0 ? (
                                        <span className='text-moss-600 font-medium'>Free</span>
                                    ) : (
                                        `$${order.shipping.toFixed(2)}`
                                    )}
                                </span>
                            </div>
                            <div className="flex justify-between font-semibold text-bark-900 pt-2 border-t border-stone-300">
                                <span>Total</span>
                                <span className="font-mono tabular-nums">
                                    ${order.totalWithShipping.toFixed(2)}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Link href={ROUTES.home} className='btn-primary w-full justify-center py-3' >Back to home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}