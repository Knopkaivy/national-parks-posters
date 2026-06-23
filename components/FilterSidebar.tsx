'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { PARKS, STYLES } from "@/data/products"
import FilterSection from "./FilterSection"

export default function FilterSidebar(){
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const activePark = searchParams.get('park') ?? undefined;
    const activeStyle = searchParams.get('style') ?? undefined;

    const updateParam = (key: string, value: string) =>{
        const params = new URLSearchParams(searchParams.toString());
        const isActive = params.get(key) === value;
        if(isActive){
            params.delete(key);
        } else {
            params.set(key, value);
        }
        router.replace(`${pathname}?${params.toString()}`, {scroll: false});
    }

    const updatePark = (id: string) => {
        updateParam('park', id);
    }

    const updateStyle = (id: string) => {
        updateParam('style', id);
    }

    return (
        <aside className="hidden lg:block w-52 shrink-0 sticky top-24">
            <div className="flex flex-col">
                <FilterSection activeId={activePark} title='Parks' filters={PARKS} updateParam={updatePark}/>
                <FilterSection activeId={activeStyle} title='Styles' filters={STYLES} updateParam={updateStyle}/>
            </div>
        </aside>
    )
}