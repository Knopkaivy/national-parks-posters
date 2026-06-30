import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import type {Order} from '@/data/types';
import { ORDER_STORAGE_KEY } from '@/constants';

interface OrderStore {
    order: Order | null;
    setOrder: (order: Order) => void;
    clearOrder: () => void;
}

export const useOrderStore = create<OrderStore>()(
    persist(
        (set) =>({
            order: null,
            setOrder: (order) => set({order}),
            clearOrder: () => set({order: null})
        }),
        {
            name: ORDER_STORAGE_KEY,
        }
    )
)