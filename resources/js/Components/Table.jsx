import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import React, { Children } from 'react'
import { Link, router } from "@inertiajs/react";

const Table = ({ children }) => {
    return (
        <div className="w-full overflow-hidden overflow-x-auto border-collapse rounded-lg border dark:border-gray-700">
            <table className="min-w-full text-sm table-auto">
                {children}
            </table>
        </div>
    );
};

const Thead = ({ className = '', children }) => {
    return (
        <thead className={`${className} border-b bg-gray-50 dark:border-gray-900 dark:bg-gray-950`}>{children}</thead>
    );
};

const Tbody = ({ className = '', children }) => {
    return (
        <tbody className={`${className} divide-y bg-white dark:divide-gray-900 dark:bg-gray-950`}>
            {children}
        </tbody>
    );
};

const Td = ({ className = '', children, ...props}) => {
    return (
        <td
            className={`${className} whitespace-nowrap p-4 align-middle text-gray-700 dark:text-gray-400`}
            {...props}
        >
            {children}
        </td>
    );
};

const Th = ({ className = '', url, name, sortable = false, queryParams = {}, children, ...props}) => {

    const sortChanged = (name) => {
        if(name === queryParams.sort_field) {
            queryParams.sort_direction = queryParams.sort_direction === 'asc' ? 'desc' : 'asc';
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }
    
        router.get(url,queryParams);
    }

    return (
        <th
            scope="col"
            className={`${className} h-12 px-4 align-middle font-medium text-gray-700 dark:text-gray-400`}
            onClick={(e) => sortChanged(name)}
            {...props}
            >
            <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                {children}
                {sortable && (
                    <div>
                        <ChevronUpIcon className={"w-3 " + (queryParams.sort_field == name && queryParams.sort_direction == 'asc' ? "text-gray-900 dark:text-gray-100 stroke-2 font-bold" : "text-gray-600 dark:text-gray-400")}/>
                        <ChevronDownIcon className={"w-3 -mt-1 " + (queryParams.sort_field == name && queryParams.sort_direction == 'desc' ? "text-gray-900 dark:text-gray-100 stroke-2 font-bold" : "text-gray-600 dark:text-gray-400")}/>
                    </div>
                )}
            </div>
        </th>
    );
};

const Empty = ({colSpan, message, children}) => {
    return (
        <tr>
            <td colSpan={colSpan}>
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        {children}
                        <div className="mt-5">
                            {message}
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}

Table.Thead = Thead;
Table.Tbody = Tbody;
Table.Td = Td;
Table.Th = Th;
Table.Empty = Empty;

export default Table;
