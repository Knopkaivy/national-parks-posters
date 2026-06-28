import { NextRequest, NextResponse } from "next/server";
import {stripe} from '@/lib/stripe';
import { STRIPE_CURRENCY } from "@/constants";

export async function POST(req: NextRequest) {
    try{
        const {totalPrice} = await req.json();

        if(!totalPrice || typeof totalPrice !== 'number' || totalPrice <= 0){
            return NextResponse.json(
                {error: 'Invalid total price'},
                {status: 400}
            )
        }

        const amount = Math.round(totalPrice * 100);
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: STRIPE_CURRENCY,
            automatic_payment_methods: {enabled: true},
            metadata: {
                source: "national-parks-posters-test-store",
            },
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch(error){
        console.error('Stripe PaymentIntent error: ', error);
        return NextResponse.json(
            {error: 'Failed to create payment intent'},
            {status: 500}
        );
    }
}