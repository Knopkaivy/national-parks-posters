import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps{
    park: string,
    parkLabel: string,
}

export default function Breadcrumb({park, parkLabel}: BreadcrumbProps){

    return (
        <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-sm text-bark-400">
                <li>
                    <Link href='/' className="hover:text-bark-600 transition-colors focus-visible:ring-2 focus-visible:ring-moss-400 rounded" >
                        All prints
                    </Link>
                </li>
                <li aria-hidden='true' >
                    <ChevronRight size={13} strokeWidth={2}/>
                </li>
                <li>
                    <Link href={`/?park=${park}`} className="hover:text-bark-600 transition-colors focus-visible:ring-2 focus-visible:ring-moss-400 rounded" >{parkLabel}</Link>
                </li>
            </ol>
        </nav>
    )
}