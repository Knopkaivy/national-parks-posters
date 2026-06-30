'use client'

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe-client";
import { useCartStore } from "@/store/cartStore";
import CheckoutForm from "@/components/CheckoutForm";
import OrderSummary from "@/components/OrderSummary";

export default function CheckoutPage(){
    const items = useCartStore(state => state.items);
    const totalPrice = useCartStore(state => state.totalPrice);
    const hasHydrated = useCartStore(state => state.hasHydrated);

    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // FETCH CLIENT SECRET
    useEffect(() => {
        if(hasHydrated){

            if(items.length === 0) return;
    
            const createIntent = async () => {
                try {
                    const res = await fetch('/api/create-payment-intent', {
                        method: 'POST',
                        headers: { "Content-Type": "application/json"},
                        body: JSON.stringify({totalPrice}),
                    });
    
                    if(!res.ok) throw new Error('Failed to initialize payment');
    
                    const data = await res.json();
                    setClientSecret(data.clientSecret);
                } catch(error){
                    setError('Something went wrong. Please go back and try again.')
                }
            }
            createIntent();
        }
    }, [hasHydrated]);

    return (
        <div className="page-container py-8 md:py-12">
            <h1 className="font-display text-3xl text-bark-900 mb-8">Checkout</h1>
            <div className="flex flex-col lg:flex-row gap-10 max-w-5xl mx-auto">
                <div className="flex-1 min-w-0">
                    {error && (
                        <div className="mb-6 text-sm text-red-500 bg-red-50 border border-red-200 rounded px-4 py-3">
                            {error}
                        </div>
                    )}
                    {!clientSecret ? (
                        <div className="space-y-8 animate-pulse">
                            <div className="space-y-3">
                                <div className="h-3 w-16 rounded bg-stone-200" />
                                <div className="h-10 rounded bg-stone-200" />
                            </div>
                            <div className="space-y-3">
                                <div className="h-3 w-24 rounded bg-stone-200" />
                                <div className="grid grid-cols-2 gap-3">
                                <div className="h-10 rounded bg-stone-200" />
                                <div className="h-10 rounded bg-stone-200" />
                                </div>
                                <div className="h-10 rounded bg-stone-200" />
                                <div className="h-10 rounded bg-stone-200" />
                                <div className="grid grid-cols-3 gap-3">
                                <div className="h-10 rounded bg-stone-200" />
                                <div className="h-10 rounded bg-stone-200" />
                                <div className="h-10 rounded bg-stone-200" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="h-3 w-20 rounded bg-stone-200" />
                                <div className="h-32 rounded bg-stone-200" />
                            </div>
                            <div className="h-12 rounded bg-stone-200" />
                        </div>
                    ) : (
                        <Elements
                        stripe={stripePromise}
                        options={{
                            clientSecret,
                            appearance: {
                                theme: "stripe",
                                variables: {
                                    colorPrimary:    "#3A5C3A",
                                    colorBackground: "#ffffff",
                                    colorText:       "#1C1A17",
                                    colorDanger:     "#ef4444",
                                    fontFamily:      "Inter, system-ui, sans-serif",
                                    borderRadius:    "6px",
                                    spacingUnit:     "4px",
                                },
                            },
                        }} >
                            <CheckoutForm/>
                        </Elements>
                    )}
                </div>
                <div className="lg:w-80 shrink-0">
                    <div className="sticky top-24">
                        <OrderSummary variant="checkout"/>
                    </div>
                </div>
            </div>
        </div>
    );
}