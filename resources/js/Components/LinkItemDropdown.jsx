import React, { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
// import { clsx } from 'clsx';
export default function LinkItemDropdown({icon, title, data, access, sidebarOpen, ...props}) {

    // destruct url from usepage
    const { url } = usePage();

    // define state
    const [isOpen, setIsOpen] = useState(false);

    // destruct auth from usepage props
    const { auth } = usePage().props;

    // check permissions
    const hasPermission = auth.super === true || access === true;

    // styles links
    const sideOpen = 'min-w-full flex items-center font-medium gap-x-3.5 px-4 py-3 hover:border-r-2 capitalize hover:cursor-pointer text-sm text-gray-500 hover:border-r-gray-700 hover:text-gray-900 dark:text-gray-500 dark:hover:border-r-gray-50 dark:hover:text-gray-100 ';
    const sideClose = 'min-w-full flex justify-center py-3 hover:border-r-2 hover:cursor-pointer  text-gray-500 hover:border-r-gray-700 hover:text-gray-900 dark:text-gray-500 dark:hover:border-r-gray-50 dark:hover:text-gray-100';
    const sideActive = 'border-r-2 border-r-gray-400 bg-gray-100 text-gray-700 dark:border-r-gray-500 dark:bg-gray-900 dark:text-white';

    return (
        <>
            {
                hasPermission ?
                    sidebarOpen ?
                        <>
                            <button
                                className={sideOpen + ' justify-between'}
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <div className='flex items-center gap-5'>{icon}{title}</div>
                                {isOpen ? <ChevronUpIcon className='w-5'/> : <ChevronDownIcon className='w-5'/>}
                            </button>
                            {isOpen && data.map((item, i) => (
                                <Link key={i} href={item.href} 
                                    className={sideOpen + (url === item.href && sideActive) + ' border-l-2'}>
                                    <div className="flex gap-x-3.5 ml-4">
                                    {item.icon} {item.title}
                                    </div>
                                </Link>
                            ))}
                        </>

                    :
                    <>
                        <button
                            className={sideClose}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {icon}
                        </button>
                        {isOpen && data.map((item, i) => (
                            <Link key={i} href={item.href} 
                                className={sideClose + (url === item.href && sideActive)}
                                >
                                {item.icon}
                            </Link>
                        ))}
                    </>
                :
                null
            }
        </>
    )
}
