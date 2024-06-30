import { Link } from "@inertiajs/react";

export default function Pagination({links, align}) {
    const alignmentClass = align === 'l' ? 'justify-start' :
                           align === 'r' ? 'justify-end' :
                           align === 'c' ? 'justify-center' : 'justify-end';

    return (
        <nav className={`mt-2 lg:mt-5 flex items-center gap-1 ${alignmentClass}`}>
            {links.map(link => (
                <Link 
                preserveScroll
                href={link.url || ""}
                key={link.label}
                className={"px-2 py-1 text-sm border border-gray-400 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-900 dark:border-gray-900 " + (link.active ? "bg-gray-200 text-gray-700 dark:bg-gray-900 dark:text-gray-50" : "") + 
                (!link.url ? "!text-gray-400 cursor-not-allowed" : "hover:bg-gray-300") + 
                (link.label.includes("Next") || link.label.includes("Previous") ? " border-0" : "")}
                dangerouslySetInnerHTML={{__html: link.label}}>
                </Link>
            ))}
        </nav>
    );
}