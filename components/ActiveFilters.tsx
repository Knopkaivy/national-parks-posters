'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { X } from 'lucide-react';
import { PARKS, STYLES } from "@/data/products"

export default function ActiveFilters(){
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const activePark = searchParams.get('park') ?? undefined;
    const activeStyle = searchParams.get('style') ?? undefined;
    const activeParkLabel  = PARKS.find(p => p.id === activePark)?.label;
    const activeStyleLabel = STYLES.find(s => s.id === activeStyle)?.label;

    const updateParam = (key: string, value: string) =>{
        const params = new URLSearchParams(searchParams.toString());
        const isActive = params.get(key) === value;
        if(isActive){
            params.delete(key);
        } 
        router.replace(`${pathname}?${params.toString()}`, {scroll: false});
    }

    if (!activePark && !activeStyle) return null;

    return(
        <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-bark-400">Filtered by:</span>
            {activePark && <button type="button" className='inline-flex items-center gap-1.5
                badge-moss
                hover:bg-moss-200 hover:text-moss-900
                transition-colors duration-150
                focus-visible:ring-2 focus-visible:ring-moss-400 focus-visible:outline-none
            ' onClick={()=>updateParam('park', activePark)} >{activeParkLabel} <X size={11} strokeWidth={2.5} aria-hidden="true"/></button>}
            {activeStyle && <button type="button" className='
                inline-flex items-center gap-1.5
                badge-sandstone
                hover:bg-sandstone-200 hover:text-sandstone-900
                transition-colors duration-150
                focus-visible:ring-2 focus-visible:ring-moss-400 focus-visible:outline-none
            ' onClick={()=>updateParam('style', activeStyle)} >{activeStyleLabel} <X size={11} strokeWidth={2.5} aria-hidden="true"/></button>}
        </div>
    )
}