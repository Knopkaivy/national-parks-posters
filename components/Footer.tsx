import Link from "next/link";
import { ROUTES, SITE_NAME } from "@/constants";

const FOOTER_LINKS = [
    {
        heading: 'Shop',
        links: [
            {href: ROUTES.home, label: 'All prints'},
            {href: '/?style=photography', label: 'Photography'},
            {href: '/?style=vintage', label: 'Vintage WPA'},
            {href: '/?style=minimalist', label: 'Minimalist'},
            {href: '/?style=watercolor', label: 'Watercolor'},
        ]
    },
    {
        heading: 'Parks',
        links: [
            {href: '/?park=yosemite', label: 'All prints'},
            {href: '/?park=yellowstone', label: 'Yellowstone'},
            {href: '/?park=grand-canyon', label: 'Grand-canyon'},
            {href: '/?park=zion', label: 'Zion'},
            {href: '/?park=arches', label: 'Arches'},
        ]
    },
    {
        heading: 'Info',
        links: [
            {href: '/shipping', label: 'Shipping & returns'},
            {href: '/about', label: 'About the prints'},
            {href: '/ROUTES.cart', label: 'Cart'},
        ]
    },
]

export default function Footer(){
    const year = new Date().getFullYear();

    return (
        <footer className="mt-auto px-2 border-t border-stone-200 bg-stone-100">
            <div className="page-container py-12 md:py-16">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="sm:col-span-2 lg:col-span-1">
                        <Link href={ROUTES.home} className="inline-flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-moss-400 rounded" aria-label={`${SITE_NAME} - home`} >
                            <span className="font-display text-base font-500 text-bark-900">National Parks</span>
                        </Link>
                        <p className="mt-3 text-sm text-bark-500 leading-relaxed max-w-xs">
                            Fine art poster prints celebrating America&apos;s national parks. Archival inks on cotton rag paper.
                        </p>
                    </div>

                    {/* LINK COLUMNS */}

                    {FOOTER_LINKS.map(({heading, links})=>(
                        <div key={heading}>
                            <h3 className="text-xs font-semibold uppercase tracking-widest text-bark-400 mb-4" >{heading}</h3>
                            <ul className="space-y-2.5" role="list" >
                                {links.map(({href, label}) =>(
                                    <li key={href} >
                                        <Link href={href} className="text-sm text-bark-600 hover:text-bark-900 transition-colors focus-visible:ring-2 focus-visible:ring-moss-400 rounded" >{label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* BOTTOM BAR */}

                <div className="mt-10 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-bark-400">
                    <p>{year} {SITE_NAME}. Portfolio project — not a real store.</p>
                    <p>Built with Next.js, Stripe & Tailwind CSS</p>
                </div>
            </div>
        </footer>
    )
}