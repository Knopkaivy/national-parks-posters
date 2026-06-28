import Stripe from "stripe";

console.log("KEY EXISTS:", !!process.env.STRIPE_SECRET_KEY);

if(!process.env.STRIPE_SECRET_KEY){
    throw new Error('STRIPE_SECRET_KEY is not set in .env.local');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2026-06-24.dahlia',
    typescript: true,
})