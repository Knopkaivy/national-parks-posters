'use client'

import Image from "next/image";
import Link from 'next/link';
import {Minus, Plus, X} from 'lucide-react';
import { CartItem } from "@/data/types";
import { useCartStore } from "@/store/cartStore";
import { PARK_LABELS, ROUTES, SIZE_LABELS, MAX_QUANTITY_PER_ITEM } from "@/constants";

interface CartLineItemProps{
    item: CartItem
}

export default function CartLineItem({item}: CartLineItemProps){
    const updateQty = useCartStore(state => state.updateQty)
    const removeItem = useCartStore(state => state.removeItem)
    const lineTotal = (item.quantity * item.price).toFixed(2);

    const handleUpdateQty = () =>{
        if(item.quantity > 1){
            updateQty(item.productId, item.size, item.finish, item.quantity - 1);
        } else {
            removeItem(item.productId, item.size, item.finish);
        }
    }

    return (
        <li className="flex gap-4 py-5" >
            {/* THUMBNAIL */}
            <div className="shrink-0 w-20 bg-white shadow-md p-1.5">
                <div className="relative aspect-[2/3]">
                    <Image src={item.image.url} alt={item.image.alt} fill sizes="80px" className="object-cover" />
                </div>
            </div>
            <div className="flex flex-1 flex-col gap-2 min-w-0">
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-bark-400">{PARK_LABELS[item.park] ?? item.park}</p>
                        <Link href={ROUTES.product(item.slug)} className="text-sm font-medium text-bark-900 leading-snug underline underline-offset-2 decoration-stone-300 hover:text-moss-700 hover:decoration-moss-400 transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-moss-400 focus-visible:outline-none">{item.name}</Link>
                    </div>
                    <button type="button" 
                    onClick={() => removeItem(item.productId, item.size, item.finish)} 
                    className="shring-0 p-1 text-bark-400 hover:text-bark-900 transition-colors rounded focus-visible:ring-2 focus-visible:ring-moss-400 focus-visible:outline-none"
                    aria-label={`Remove ${item.name} from cart`} >
                        <X size={14} strokeWidth={2}/>
                    </button>
                </div>
                <p className="text-xs text-bark-400 capitalize">{SIZE_LABELS[item.size]} · {item.finish}</p>
                {/* QTY CONTROLS */}
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center border border-stone-300 rounded">
                        <button type="button"
                        onClick={handleUpdateQty}
                        className="px-2.5 py-1.5 tet-bark-600 hover:text-bark-900 disavled:opacity-30 disabled:cursor-not-allowed transition-colors focus-visible:ring-2 focus-visible:ring-moss-400 focus-visible:outline-none"
                        aria-label="Decrease quantity" >
                            <Minus size={12} strokeWidth={2.5} />
                        </button>
                        <span className="px-3 py-1.5 text-sm font-medium text-bark-900 tabular-nums min-w-[2rem] text-center border-x border-stone-300" >{item.quantity}</span>
                        <button type="button"
                        onClick={()=>updateQty(item.productId, item.size, item.finish,item.quantity + 1)}
                        disabled={item.quantity >= MAX_QUANTITY_PER_ITEM}
                        className="px-2.5 py-1.5 text-bark-600 hover:text-bark-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus-visible:ring-2 focus-visible:ring-moss-400 focus-visible:outline-none" >
                            <Plus size={12} strokeWidth={2.5}/>
                        </button>
                    </div>
                    {/* TOTAL */}
                    <p className="font-mono text-sm font-semibold text-bark-900 tabular-nums">${lineTotal}</p>
                </div>
            </div>

        </li>
    )
}