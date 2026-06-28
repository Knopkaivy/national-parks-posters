'use client'

import {useState, useEffect, useRef} from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ShoppingCart, Menu, X } from 'lucide-react';

import { useCartStore } from '@/store/cartStore';
import { ROUTES } from "@/constants";

const NAV_LINKS = [
  { href: ROUTES.home,     label: "All prints"  },
  { href: "/?style=photography", label: "Photography" },
  { href: "/?style=vintage",     label: "Vintage WPA" },
  { href: "/?style=minimalist",  label: "Minimalist"  },
  { href: "/?style=watercolor",  label: "Watercolor"  },
] as const;

export default function Navbar(){
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPath = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    const totalItems = useCartStore(state => state.totalItems);
    const openCart = useCartStore(state => state.openCart);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [badgePulse, setBadgePulse] = useState(false);
    const prevTotalRef = useRef(totalItems);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    // STICKY SHADOW ON SCROLL
    useEffect(()=>{
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener('scroll', onScroll, {passive: true});
        return () => window.removeEventListener('scroll', onScroll);
    }), [];

    // PULSE BADGE EFFECT
    useEffect(()=>{
        if(totalItems > prevTotalRef.current){
            setBadgePulse(true);
            const t = setTimeout(()=> setBadgePulse(false), 400);
            prevTotalRef.current = totalItems;
            return () => clearTimeout(t);
        }
        prevTotalRef.current = totalItems;
    }),[totalItems];

    // CLOSE MODAL ON ROUTE CHANGE
    useEffect(()=>{
        setMobileOpen(false);
    },[pathname]);

    // CLOSE MODAL KEYBOARD LISTENERS
    useEffect(()=>{
        if(!mobileOpen) return;
        const handleKey = (event: KeyboardEvent) =>{
            if(event.key === 'Escape') setMobileOpen(false);
        };
        document.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        }
    }, [mobileOpen]);

    return(
        <>
            <header className={`sticky top-0 z-40 w-full px-2 bg-stone-100/95 backdrop-blur-sm border-b border-stone-200 transition-shadow duration-200 ${scrolled ? "shadow-card" : "shadow-none"}`}>
                <nav className="page-container flex h-16 items-center justify-between gap-4" aria-label='National Parks Poster Store — home' >
                    <Link href={ROUTES.home} className='flex items-center gap-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss-400 rounded' aria-label='National Parks Poster Store — home'>
                        <span className="font-display text-lg font-500 tracking-tight text-bark-900 leading-tight">National Parks<br className='hiddem sm:block'/>
                            <span className="text-bark-400 font-normal text-base"> Poster Store</span>
                        </span>
                    </Link>

                    <ul className="hidden lg:flex items-center gap-1" role='list'>
                        {NAV_LINKS.map(({href, label}) => {
                            const isActive = currentPath === href || (href !== "/" && currentPath.startsWith(href));
                            return (
                                <li key={href}>
                                    <Link href={href} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-moss-400 focus-visible:outline-none
                                    ${isActive ? "bg-moss-100 text-moss-700" : "text-bark-600 hover:text-bark-900 hover:bg-stone-200"}
                                    `} aria-current={isActive ? "page" : undefined}>
                                        {label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="flex items-center-gap-2">
                        <button 
                        className='relative flex items-center justify-center w-10 h-10 rounded-md text-bark-700 hover:bg-stone-200 transition-colors'
                        aria-label={`Cart - ${totalItems} items`}
                        onClick={openCart} >
                            <ShoppingCart size={20} strokeWidth={1.75} />
                            {totalItems > 0 && (
                                <span className={`absolute -top-0.5 -right-0.5 min-w-[1.125rem] flex items-center justify-center rounded-full bg-sandstone-600 text-white text-[10px] font-bold leaning-none px-1 ${badgePulse ? 'car-badge-pulse' : ''}`} aria-hidden='true' >
                                    {totalItems > 99 ? '99+' : totalItems}
                                </span>
                            )}
                        </button>

                        {/* MOBILE MENU TOGGLE */}

                        <button type='button' className='lg:hidden flex items-center justify-center w-10 h-10 rounded-md text-bark-700 hover:bg-stone-200 transition-colors focus-visible:ring-2 focus-visible:ring-moss-400 focus-visible:outline-none'
                            aria-expanded={mobileOpen} aria-controls='mobile-menu' aria-label={mobileOpen ? 'Close menu' : 'Open menu'} 
                            onClick={() => setMobileOpen( isOpen => !isOpen)} >
                            {mobileOpen ? <X size={20}/> : <Menu size={20}/>}
                        </button>
                    </div>
                </nav>
            </header>

            {/* MOBILE MENU OVERLAY */}

            {mobileOpen && (
                <div className="fixed inset-0 z-30 bg-bark-900/40 backdrop-blur-sm lg:hidden" aria-hidden='true' onClick={()=> setMobileOpen(false)} ></div>
            )}

            {/* MOBILE MENU DRAWER */}

            <div id='mobile-menu' ref={mobileMenuRef} role='dialog'  className={`fixed top-16 right-0 bottom-0 z-40 w-72 bg-stone-50 border-1 border-stone-200 flex flex-col transform transition-transform duration-200 ease-out-smooth lg:hidden ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`} aria-modal='true' aria-label='Navigation menu' >
                <nav className='flex-1 overflow-y-auto px-4 py-6' aria-label='Mobile navigation' >
                    <ul className='space-y-1' role='list' >
                        {NAV_LINKS.map(({href, label}) =>{
                            const isActive = pathname === href;
                            return (
                                <li key={href}>
                                    <Link href={href} className={`flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-moss-400 focus-visible:outline-none ${isActive ? 'bg-moss-50 text-moss-700' : 'text-bark-700 hover:bg-stone-200 hover:text-bark-900'}`} aria-current={isActive ? 'page' : undefined} >
                                        {label}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
                
                <div className="p-4 border-t border-stone-200">
                    <Link href={ROUTES.cart} className='btn-primary w-full' >
                        <ShoppingCart size={16}/>
                        View cart
                        {totalItems > 0 && (
                            <span className='ml-auto rounded-full bg-sandstone-600 px-2 py-0.5 text-xs font-bold' >
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </>
    )
}