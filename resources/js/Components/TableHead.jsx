import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'

export default function TableHead({name, sortable = true, sort_field = null, sort_direction = null, children, sortChanged = () => {}}) {
    return (
        <th className="w-1/8 py-3 px-3 text-sm text-gray-600 border-b" onClick={(e) => sortChanged(name)}>
            <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                {children}
                {sortable && (
                    <div>
                        <ChevronUpIcon className={"w-3 " + (sort_field == name && sort_direction == 'asc' ? "text-black" : "")}/>
                        <ChevronDownIcon className={"w-3 -mt-1 " + (sort_field == name && sort_direction == 'desc' ? "text-black" : "")}/>
                    </div>
                )}
            </div>
        </th>
    );
}