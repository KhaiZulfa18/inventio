import { usePage } from '@inertiajs/react';
import { PlusCircleIcon, TableCellsIcon, UserPlusIcon, ShieldExclamationIcon, UsersIcon, TagIcon, CubeIcon } from '@heroicons/react/24/outline';
import hasAnyPermission from './Permissions';
import React from 'react'

export default function Menu() {

    // define use page
    const { url } = usePage();

    // define menu navigations
    const menuNavigation = [
        {
            title: 'Overview',
            permissions: hasAnyPermission(['dashboard']),
            details: [
                {
                    title : 'Dashboard',
                    href : '/dashboard',
                    active: url.startsWith('/dashboard') ? true : false,
                    icon : <TableCellsIcon className="w-5"/>,
                    permissions:  hasAnyPermission(['dashboard']),
                },
            ]
        },
        {
            title: 'User Management',
            permissions: hasAnyPermission(['permission-view']) || hasAnyPermission(['role-view']) || hasAnyPermission(['user-view']),
            details : [
                {
                    title : 'Hak Akses',
                    href : '/permissions',
                    active: url.startsWith('/permissions') ? true : false,
                    icon : <UserPlusIcon className="w-5"/>,
                    permissions: hasAnyPermission(['permission-view']),
                },
                {
                    title : 'Akses Group',
                    href : '/roles',
                    active: url.startsWith('/roles') ? true : false,
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
                            href: '/user',
                            icon: <TableCellsIcon className="w-5"/>,
                            active: url.startsWith('/user') ? true : false,
                            permissions: hasAnyPermission(['user-view']),
                        },
                    ]
                }
            ]
        },
        {
            title: 'Master Management',
            permissions: hasAnyPermission(['category-view']) || hasAnyPermission(['product-view']),
            details : [
                {
                    title : 'Kategori',
                    href : '/category',
                    active: url.startsWith('/category') ? true : false,
                    icon : <TagIcon className="w-5"/>,
                    permissions: hasAnyPermission(['category-view']),
                },
                {
                    title : 'Produk',
                    href : '/product',
                    active: url.startsWith('/product') ? true : false,
                    icon : <CubeIcon className="w-5"/>,
                    permissions:  hasAnyPermission(['product-view']),
                },
            ]
        },
    ]

    return menuNavigation;
}
