import {create} from 'zustand';
import {persist} from 'zustand/middleware';

import type { CartItem, Cart } from '@/data/types';
import { CART_STORAGE_KEY, MAX_QUANTITY_PER_ITEM } from '@/constants';

interface CartStore extends Cart {
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (productId: string, size: string, finish: string) => void;
    updateQty: (productId: string, size: string, finish: string, qty: number) => void;
    clearCart: () => void;
}

const itemKey = (productId: string, size: string, finish: string) => {
    return `${productId}::${size}::${finish}`
}

const computeTotals = (items: CartItem[]) =>{
    return {
        totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
        totalPrice: +items.reduce((sum, i) => sum + i.price*i.quantity, 0).toFixed(2),
    };
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) =>({
            items: [],
            totalItems: 0,
            totalPrice: 0,
            addItem(incoming){
                const items = get().items;
                const key = itemKey(incoming.productId, incoming.size, incoming.finish);
                const idx = items.findIndex(i => itemKey(i.productId, i.size, i.finish) === key);

                let updated: CartItem[];

                if(idx >= 0){
                    updated = items.map((item, i) => i === idx ? {...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY_PER_ITEM)} : item);
                } else {
                    updated = [...items, {...incoming, quantity: 1}];
                }

                set({items: updated, ...computeTotals(updated)})
            },

            removeItem(productId, size, finish) {
                const key = itemKey(productId, size, finish);
                const updated = get().items.filter(i => itemKey(i.productId, i.size, i.finish) !== key);
                set({items: updated, ...computeTotals(updated)});
            },

            updateQty(productId, size, finish, qty){
                const key = itemKey(productId, size, finish);
                if(qty <0){
                    get().removeItem(productId, size, finish);
                    return;
                }

                const updated = get().items.map(item => itemKey(item.productId, item.size, item.finish) === key ? {...item, quantity: Math.min(qty, MAX_QUANTITY_PER_ITEM)} : item);
                set({items: updated, ...computeTotals(updated)});
            },

            clearCart(){
                set({items: [], totalItems: 0, totalPrice: 0});
            },
        }),
        {
            name: CART_STORAGE_KEY,
            partialize: (state) => ({items: state.items}),
            onRehydrateStorage: () => (state) =>{
                if(state){
                    const totals = computeTotals(state.items);
                    state.totalItems = totals.totalItems;
                    state.totalPrice = totals.totalPrice;
                }
            },
        }
    )
);