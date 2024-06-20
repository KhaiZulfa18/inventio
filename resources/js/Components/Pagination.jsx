import { Link } from "@inertiajs/react";

export default function Pagination({links, align}) {
    const alignmentClass = align === 'l' ? 'text-left' :
                           align === 'r' ? 'text-right' :
                           align === 'c' ? 'text-center' : 'text-right';

    return (
        <nav className={`mt-4 ${alignmentClass}`}>
            {links.map(link => (
                <Link 
                preserveScroll
                href={link.url || ""}
                key={link.label}
                className={"inline-block py-2 px-3 rounded-lg text-gray-700 text-xs " + (link.active ? "bg-gray-300 " : "") + 
                (!link.url ? "!text-gray-400 cursor-not-allowed" : "hover:bg-gray-300")}
                dangerouslySetInnerHTML={{__html: link.label}}>
                </Link>
            ))}
        </nav>
    );
}