'use client'

import { useState } from "react";
import {toast} from 'sonner';
import type { CartItem, Product, SizeId, FinishId } from "@/data/types";
import { FINISH_DESCRIPTIONS, PARK_LABELS, SIZE_LABELS, TOAST } from "@/constants";
import { useCartStore } from "@/store/cartStore";
import { getPrice, getStock } from "@/data/products";
import { ShoppingCart, Star } from "lucide-react";

interface ProductInfoProps {
    product: Product
}

export default function ProductInfo({product}: ProductInfoProps){
    const addItem = useCartStore((s) => s.addItem);
    const [currentSize, setCurrentSize] = useState<SizeId>(product.sizes[0]);
    const [currentFinish, setCurrentFinish] = useState<FinishId>(product.finishes[0]);
    const currentPrice = getPrice(product, currentSize);

    const availableSizes = product.sizes.filter(sizeId => product.finishes.some(finishId => getStock(product, sizeId, finishId) > 0));
    const availableFinishes = product.finishes.filter(finishId => getStock(product, currentSize, finishId) > 0);

    const handleSizeChange = (sizeId: SizeId) =>{
        setCurrentSize(sizeId);
        const stillAvailable = getStock(product, sizeId, currentFinish) > 0;
        if(!stillAvailable){
            const firstAvailable = product.finishes.find(finishId => getStock(product, sizeId, finishId) > 0);
            if(firstAvailable) setCurrentFinish(firstAvailable);
        }
    }

    const handleAddToCart = () =>{
        const newItem: Omit<CartItem, 'quantity'> = {
            productId: product.id,
            slug: product.slug,
            name: product.name,
            park: product.park,
            size: currentSize,
            finish: currentFinish,
            price: currentPrice,
            image: product.images[0]
        }
        addItem(newItem);
        toast.success(TOAST.addedToCart);
    }

    return (
        <div className="flex flex-col gap-6">
            <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-bark-400 mb-1" >{PARK_LABELS[product.park] ?? product.park}</p>
                <h1 className="font-display text-3xl md:text-4xl text-bark-900 leading-tight" >{product.name}</h1>
                {/* RATING */}
                <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i)=>( <Star key={i} size={13} className={i < Math.round(product.rating) ? 'fill-sandstone-400 text-sandstone-400' : 'fill-stone-200 text-stone-200'}/>))}
                    </div>
                    <span className="text-xs text-bark-400">{product.rating} ({product.reviewCount} reviews)</span>
                </div>
            </div>
            {/* PRICE */}
            <p className="font-mono text-2xl font-semibold text-bark-900 tabular-nums">${currentPrice.toFixed(2)}</p>
            {/* SIZE PICKER */}
            <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-bark-400 mb-2.5" >Size - <span className="normal-case font-normal text-bark-600" >{SIZE_LABELS[currentSize]}</span></p>
                <fieldset className="flex flex-wrap gap-2" >
                    <legend className="sr-only" >Select a size</legend>
                    {availableSizes.map(size=>(
                        <div className="" key={size}>
                            <input id={`size-${size}`} type="radio" checked={size === currentSize} value={size} name="sizes" onChange={()=>handleSizeChange(size)} className="sr-only" />
                            <label htmlFor={`size-${size}`} className={`cursor-pointer px-3 py-1.5 text-sm rounded border transition-colors duration-150 ${size === currentSize ? 'bg-bark-900 text-white border-bark-900' : 'bg-white text-bark-700 border-stone-400 hover:border-bark-600'}`} >{SIZE_LABELS[size]}</label>
                        </div>
                        )
                    )}
                </fieldset>
            </div>
            {/* FINISH PICKER */}
            <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-bark-400 mb-2.5">Finish - <span className="capitalize font-normal text-bark-600" >{currentFinish}</span></p>
                <fieldset className="flex glex-wrap gap-2" >
                    <legend className="sr-only" >Select a finish</legend>
                    {availableFinishes.map(finish=>(
                        <div key={finish}>
                            <input id={`finish-${finish}`} type="radio" value={finish} name="finishes" checked={finish === currentFinish} onChange={()=>setCurrentFinish(finish)} className="sr-only" />
                            <label 
                            htmlFor={`finish-${finish}`} 
                            className={`cursor-pointer px-3 py-1.5 text-sm capitalize rounded border transition-colors duration-150 
                            ${finish === currentFinish ? 
                            'bg-bark-900 text-white border-bark-900' : 
                            'bg-white text-bark-700 border-stone-400 hover:border-bark-600'}`} >
                                {finish}
                            </label>
                        </div>
                        )
                    )}
                </fieldset>
                <p className="mt-2 text-xs text-bark-400 italic">{FINISH_DESCRIPTIONS[currentFinish]}</p>
            </div>

            <button type="button" onClick={handleAddToCart} className="btn-primary w-full py-3 text-base" ><ShoppingCart size={18}/> Add to cart</button>

            <div className="pt-4 border-t border-stone-200 space-y-4">
                <p className="text-sm text-bark-600 leading-relaxed" >
                   {product.description} 
                </p>
                {product.details.length > 0 && (
                    <ul className="space-y-1.5" >
                            {product.details.map((detail, i)=>(<li key={i} className="flex items-start gap-2 text-sm text-bark-500" ><span className="text-moss-500 mt-0.5 shrink-0" >-</span>{detail}</li>))}
                        </ul>
                    )
                }
            </div>
        </div>
    );
}