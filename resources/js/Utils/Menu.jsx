import { usePage } from '@inertiajs/react';
import { PlusCircleIcon, TableCellsIcon, UserPlusIcon, ShieldExclamationIcon, UsersIcon } from '@heroicons/react/24/solid';
import hasAnyPermission from './Permissions';
import React from 'react'

export default function Menu() {

    // define use page
    const { url } = usePage();

    // define menu navigations
    const menuNavigation = [
        {
            title: 'Overview',
            permissions: hasAnyPermission(['dashboard-view']),
            details: [
                {
                    title : 'Dashboard',
                    href : '/apps/dashboard',
                    active: url.startsWith('/apps/dashboard') ? true : false,
                    icon : <TableCellsIcon className="w-5"/>,
                    permissions:  hasAnyPermission(['dashboard-view']),
                },
            ]
        },
        {
            title: 'User Management',
            permissions: hasAnyPermission(['permission-view']) || hasAnyPermission(['role-view']) || hasAnyPermission(['user-view']),
            details : [
                {
                    title : 'Hak Akses',
                    href : '/apps/permissions',
                    active: url.startsWith('/apps/permissions') ? true : false,
                    icon : <UserPlusIcon className="w-5"/>,
                    permissions: hasAnyPermission(['permission-view']),
                },
                {
                    title : 'Akses Group',
                    href : '/apps/roles',
                    active: url.startsWith('/apps/roles') ? true : false,
                    icon : <UserPlusIcon className="w-5"/>,
                    permissions:  hasAnyPermission(['role-view']),
                },
                {
                    title : 'Pengguna',
                    icon : <UsersIcon className="w-5"/>,
                    permissions: hasAnyPermission(['user-view']),
                    subdetails: [
                        {
                            title: 'Data Pengguna',
                            href: '/apps/users',
                            icon: <TableCellsIcon className="w-5"/>,
                            active: url === '/apps/users' ? true : false,
                            permissions: hasAnyPermission(['users-view']),
                        }, 
                        // {
                        //     title: 'Tambah Data Pengguna',
                        //     href: '/apps/users/create',
                        //     icon: <PlusCircleIcon className="w-5"/>,
                        //     active: url === '/apps/users/create' ? true : false,
                        //     permissions: hasAnyPermission(['users-create']),
                        // },
                    ]
                }
            ]
        }
    ]

    return menuNavigation;
}
