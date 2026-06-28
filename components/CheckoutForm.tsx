'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {toast} from 'sonner';
import { useCartStore } from "@/store/cartStore";
import {ROUTES, TOAST} from '@/constants'

interface FormData{
    firstName: string,
    lastName: string,
    email: string,
    addressOne: string,
    addressTwo: string,
    city: string,
    state: string,
    zip: string,
}

export default function CheckoutForm(){
    const {register, handleSubmit, formState: { errors }} = useForm<FormData>();
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const totalPrice = useCartStore(state => state.totalPrice);
  const clearCart = useCartStore(state => state.clearCart);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);

  const onSubmit = handleSubmit((data) => console.log(data))

    return (
        <form onSubmit={onSubmit} className="space-y-8" >
            {/* CONTACT */}
            <section className="space-y-4">
                <h2 className="font-display text-xl text-bark-900">Contact</h2>
                <div className="space-y-1">
                    <label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-bark-400">
                        Email
                    </label>
                    <input 
                    id="email" 
                    type="email" 
                    placeholder="you@example.com" 
                    className={`w-full px-3 py-2.5 rounded border text-sm text-bark-900 bg-white placeholder:text-bark-300 focus:outline-none focus:ring-2 focus:ring-moss-400 transition:colors
                        ${errors.email ? 'border-red-400' : 'border-stone-300'}`}
                    {...register('email', { 
                        required: 'Email address is required', 
                        pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Enter a valid email address'
                    }})} />
                    {errors.email && (
                        <p className="text-xs text-red-500">{errors.email.message}</p>
                    )}
                </div>
            </section>
            {/* SHIPPING */}
            <section className="space-y-4">
                <h2 className="font-display text-xl text-bark-900">Shipping address</h2>
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <label htmlFor="first" className="text-xs font-semibold uppercase tracking-widest text-bark-400">
                            First name
                        </label>
                        <input 
                        id="first" 
                        type="text" 
                        placeholder="Jane"
                        {...register('firstName', { required: 'First name is required' })}
                        className={`w-full px-3 py-2.5 rounded border text-sm text-bark-900 bg-white placeholder:text-bark-300 focus:outline-none focus:ring-2 focus:ring-moss-400 transition-colors 
                        ${errors.firstName ? 'border-red-400' : 'border-stone-300'}`} />
                        {errors.firstName && (
                            <p className="text-xs text-red-500">{errors.firstName.message}</p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="last" className="text-xs font-semibold uppercase tracking-widest text-bark-400">
                            Last name
                        </label>
                        <input 
                        id="last" 
                        type="text" 
                        placeholder="Muir"
                        {...register('lastName', { required: 'Last name is required' })}
                        className={`w-full px-3 py-2.5 rounded border text-sm text-bark-900 bg-white placeholder:text-bark-300 focus:outline-none focus:ring-2 focus:ring-moss-400 transition-colors 
                        ${errors.firstName ? 'border-red-400' : 'border-stone-300'}`} />
                        {errors.lastName && (
                            <p className="text-xs text-red-500">{errors.lastName.message}</p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="address-1" className="text-xs font-semibold uppercase tracking-widest text-bark-400">
                            Address
                        </label>
                        <input
                            id="address-1"
                            type="text"
                            placeholder="123 Valley View Drive"
                            className={`
                            w-full px-3 py-2.5 rounded border text-sm text-bark-900
                            bg-white placeholder:text-bark-300
                            focus:outline-none focus:ring-2 focus:ring-moss-400
                            transition-colors
                            ${errors.addressOne ? "border-red-400" : "border-stone-300"}
                            `}
                            {...register('addressOne', { required: 'Address is required' })}
                        />
                        {errors.addressOne && (
                            <p className="text-xs text-red-500">{errors.addressOne.message}</p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="address-2" className="text-xs font-semibold uppercase tracking-widest text-bark-400">
                            Apartment, suite, etc.{" "}
                            <span className="normal-case font-normal text-bark-300">(optional)</span>
                        </label>
                        <input
                            id="address-2"
                            type="text"
                            placeholder="Apt 4B"
                            className="
                            w-full px-3 py-2.5 rounded border border-stone-300 text-sm text-bark-900
                            bg-white placeholder:text-bark-300
                            focus:outline-none focus:ring-2 focus:ring-moss-400
                            transition-colors
                            "
                            {...register('addressTwo')}
                        />
                    </div>
                    <div className="col-span-1 space-y-1">
                        <label htmlFor="city" className="text-xs font-semibold uppercase tracking-widest text-bark-400">
                        City
                        </label>
                        <input
                        id="city"
                        type="text"
                        placeholder="Yosemite"
                        className={`
                            w-full px-3 py-2.5 rounded border text-sm text-bark-900
                            bg-white placeholder:text-bark-300
                            focus:outline-none focus:ring-2 focus:ring-moss-400
                            transition-colors
                            ${errors.city ? "border-red-400" : "border-stone-300"}
                        `}
                        {...register('city', { required: 'City is equired' })}
                        />
                        {errors.city && (
                        <p className="text-xs text-red-500">{errors.city.message}</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="state" className="text-xs font-semibold uppercase tracking-widest text-bark-400">
                        State
                        </label>
                        <input
                        id="state"
                        type="text"
                        placeholder="CA"
                        maxLength={2}
                        className={`
                            w-full px-3 py-2.5 rounded border text-sm text-bark-900
                            bg-white placeholder:text-bark-300
                            focus:outline-none focus:ring-2 focus:ring-moss-400
                            transition-colors uppercase
                            ${errors.state ? "border-red-400" : "border-stone-300"}
                        `}
                        {...register('state', {
                            required: 'State is required',
                            minLength: { value: 2, message: '2 letters' },
                            maxLength: { value: 2, message: '2 letters' },
                        })}
                        />
                        {errors.state && (
                        <p className="text-xs text-red-500">{errors.state.message}</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="zip" className="text-xs font-semibold uppercase tracking-widest text-bark-400">
                        ZIP
                        </label>
                        <input
                        id="zip"
                        type="text"
                        placeholder="95389"
                        maxLength={5}
                        className={`
                            w-full px-3 py-2.5 rounded border text-sm text-bark-900
                            bg-white placeholder:text-bark-300
                            focus:outline-none focus:ring-2 focus:ring-moss-400
                            transition-colors
                            ${errors.zip ? "border-red-400" : "border-stone-300"}
                        `}
                        {...register('zip', {
                            required: 'Zipcode is required',
                            pattern: { value: /^\d{5}$/, message: '5 digits' },
                        })}
                        />
                        {errors.zip && (
                        <p className="text-xs text-red-500">{errors.zip.message}</p>
                        )}
                    </div>
                </div>
            </section>
            {/* PAYMENT */}
            <section className="space-y-4">
                <h2 className="font-display text-xl text-bark-900" >Payment</h2>
                <div className="rounded border border-stone-300 p-4 bg-white">
                    <PaymentElement/>
                </div>
            </section>
            {stripeError && (
                <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded px-4 py-3">
                    {stripeError}
                </p>
            )}
            <button 
            type="submit"
            disabled={!stripe || !elements || isProcessing}
            className="btn-primary w-full py-3 text-base disabled:opacty-50 disabled:cursor-not-allowed" >
                {isProcessing ? 'Processing ...' : `Pay $${totalPrice.toFixed(2)}`}
            </button>
        </form>
    )
}