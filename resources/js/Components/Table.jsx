import React, { Children } from 'react'

const Table = ({ children }) => {
    return (
        <div className="w-full overflow-hidden overflow-x-auto border-collapse rounded-lg border dark:border-gray-700">
            <table className="w-full text-sm">
                {children}
            </table>
        </div>
    );
};

const Thead = ({ className, children }) => {
    return (
        <thead className={`${className} border-b bg-gray-50 dark:border-gray-900 dark:bg-gray-950`}>{children}</thead>
    );
};

const Tbody = ({ className, children }) => {
    return (
        <tbody className={`${className} divide-y bg-white dark:divide-gray-900 dark:bg-gray-950`}>
            {children}
        </tbody>
    );
};

const Td = ({ className, children}) => {
    return (
        <td
            className={`${className} whitespace-nowrap p-4 align-middle text-gray-700 dark:text-gray-400`}
        >
            {children}
        </td>
    );
};

const Th = ({ className, children }) => {
    return (
        <th
            scope="col"
            className={`${className} h-12 px-4 text-left align-middle font-medium text-gray-700 dark:text-gray-400`}
        >
            {children}
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
