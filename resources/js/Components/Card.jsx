import { UserGroupIcon } from "@heroicons/react/24/outline";
import React from 'react'

const Card = ({className, children}) => {
    return (
        <div className={`p-4 rounded-lg border bg-white dark:bg-gray-950 dark:border-gray-900 ` + className}>
            {children}
        </div>
    );
}

const CardHeader = ({className = '', children}) => {
    return (
        <div className={`px-4 py-2 border-b border-gray-300 dark:border-gray-700 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200 `+ className}>
            {children}
        </div>
    );
}

const CardBody = ({ className = '', children }) => {
    return (
        <div className={`p-4 text-gray-700 dark:text-gray-200` + className}>
            {children}
        </div>
    );
};

const CardFooter = ({ className = '', children }) => {
    return (
        <div className={`px-4 py-2 text-gray-700 dark:text-gray-200 border-t border-gray-300 dark:border-gray-700 rounded-b-lg ` + className}>
            {children}
        </div>
    );
};


Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;